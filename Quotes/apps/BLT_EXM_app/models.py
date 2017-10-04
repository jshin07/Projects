# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from datetime import date

import re
import bcrypt

##Added .lower()


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class UserManager(models.Manager):
    def register(self, first_name, last_name, email, password, conf_password, birthday):
        message = []
        if len(first_name)<2 or len(last_name) <2:
            message.append('No fewer than 2 characters on name field')
        if not last_name.isalpha() or not first_name.isalpha():
            message.append('Only letters are allowed in name field')
        if len(email)<1:
            message.append('Email field required. Cannot be empty')
        if len(password)<1:
            message.append('Password Cannot be empty')
        if not EMAIL_REGEX.match (email):
            message.append('Please put a valid email')
        if conf_password != password:
            message.append('Password do not match')
        if User.userManager.filter(email=email):
            message.append('Email already in database')
        if len(birthday)<1:
            message.append('Please put your birthday')
        if len(message)>0:
            return False, message
        else:
            hashed= bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user= User.userManager.create(first_name=first_name, last_name=last_name, email=email.lower(), password=hashed, birthday=birthday)
        return True, user


    def login(self, email, password):
        message = []
        if len(email)<1:
            message.append('Email field required. Cannot be empty')

        if len(password)<1:
            message.append('Password Cannot be empty')

        if len(message)>0:
            return False, message
        else:
            user=User.userManager.filter(email=email.lower())
            if len(user)<1:
                message.append('Please register')
                return False, message
            if not bcrypt.checkpw(password.encode('utf-8'),user[0].password.encode('utf-8')):
                message.append('Incorrect password')
                return False, message
            else:
                return True, user[0]



class QuoteManager(models.Manager):
    def postquote(self, quoted_by, user, text ):
        message = []
        if len(quoted_by)<3:
            message.append('More than 3 characters needed in this field')

        if len(text)<10:
            message.append('More than 10 characters needed in this field')
        if len(message)>0:
            return False, message
        else:
            data= Quote.quoteManager.create(quoted_by=quoted_by, user_id=user, text= text)  # uers_id comes from the Secrets table it's actually user, but have to add _id. user comes from the parameter that came from the Users.secretsManager.postsecret
            return True, data

class FavManager(models.Manager):
    def fav(self, user, quoteID):
        x= Fav.favManager.filter(user_id=user,quote_id=quoteID)
        if len(x)>0:
            return (False, "You already added this on your favorite list")
        else:
            faved= Fav.favManager.create(user_id=user, quote_id=quoteID)
            return (True, faved)

    def delete(self, quoteID):
        Fav.favManager.filter(quote_id=quoteID).delete()
        return True


class User(models.Model):
    first_name= models.CharField(max_length=100)
    last_name= models.CharField(max_length=100)
    email= models.CharField(max_length=100)
    password= models.CharField(max_length=100)
    birthday= models.DateField()
    created_at= models.DateTimeField(auto_now_add= True)
    updated_at= models.DateTimeField(auto_now= True)
    userManager= UserManager()


class Quote(models.Model):
    quoted_by= models.CharField(max_length=100)
    text= models.TextField()
    created_at= models.DateTimeField(auto_now_add= True)
    updated_at= models.DateTimeField(auto_now= True)
    quoteManager=QuoteManager()
    user=models.ForeignKey(User, related_name ="posted_user")


class Fav(models.Model):
    user= models.ForeignKey(User, related_name= "fav_user")
    quote=models.ForeignKey(Quote, related_name= "fav_quote")
    created_at= models.DateTimeField(auto_now_add= True)
    updated_at= models.DateTimeField(auto_now= True)
    favManager=FavManager()
