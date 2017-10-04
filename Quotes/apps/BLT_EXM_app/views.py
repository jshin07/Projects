# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect,reverse
from .models import User, Quote, Fav
from django.contrib import messages
from django.db.models import Count

def index(request):
    return render(request, 'BLT_EXM_app/index.html')

def register(request):
    validate= User.userManager.register(request.POST["first_name"],request.POST["last_name"],request.POST["email"],request.POST["password"],request.POST["conf_password"], request.POST['birthday'])
    if validate[0] ==False:
        for errmsg in validate[1]:
            messages.add_message(request,messages.ERROR, errmsg)
        return redirect('/')
    else:
        request.session["loggedInUser"]= validate[1].first_name
        request.session["loggedInUserID"]= validate[1].id
        return redirect ('/quotes')



def login(request):
    validate= User.userManager.login(request.POST["email"],request.POST["password"])
    if validate[0] == False:
        for errmsg in validate[1]:
            messages.add_message(request, messages.ERROR, errmsg)
        return redirect('/')
    else:
        request.session["loggedInUser"]= validate[1].first_name
        request.session["loggedInUserID"]= validate[1].id
        return redirect ('/quotes')

def logout(request):
    request.session.clear()
    return redirect ('/')

def quotes(request):  #MAIN QUOTES PAGE AFTER SUCCESSFUL LOGIN/REGISTRATION
    if not 'loggedInUser' in request.session:
        return redirect ('/')
    else:
        quotes=Quote.quoteManager.all().annotate(num_fav=Count('fav_quote'))
        users=User.userManager.all()

        context= {
        "users": users,
        "quotes":quotes,
        }
        return render (request, 'BLT_EXM_app/quotes.html', context)


def sub_quote(request):
    if not 'loggedInUser' in request.session:
        return redirect ('/')
    else:
        validate= Quote.quoteManager.postquote(request.POST["quoted_by"], request.session["loggedInUserID"], request.POST['text'] )
        if validate[0] == False:
            for errmsg in validate[1]:
                messages.add_message(request, messages.ERROR, errmsg)
            return redirect('/quotes')
        else:
            "all goood"
            return redirect ('/quotes')


def add_fav(request, quoteID):
    if not 'loggedInUser' in request.session:
        return redirect ('/')
    else:
        favs= Fav.favManager.fav(request.session["loggedInUserID"], quoteID)
        if favs[0] == False:
            messages.add_message(request, messages.ERROR, favs[1])
            return redirect('/quotes')
        else:
            print favs
            return redirect('/quotes')

def delete_fav(request, quoteID):
    if not 'loggedInUser' in request.session:
        return redirect ('/')
    else:
        Fav.favManager.delete(quoteID)
        return redirect('/quotes')

def indv_user(request, userID):
    if not 'loggedInUser' in request.session:
        return redirect ('/')
    else:
        indv_user=userID

        quotes=Quote.quoteManager.filter(user_id= indv_user).annotate(num=Count('text'))
        poster =User.userManager.filter(id= indv_user)
        users=User.userManager.all()

        context= {
        "users": users,
        "quotes":quotes,
        "poster": poster
        }
        return render (request,'BLT_EXM_app/user.html', context )
