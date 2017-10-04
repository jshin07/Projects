package com.jenny.lookify.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jenny.lookify.models.Song;
import com.jenny.lookify.repositories.LookifyRepository;

@Service
public class LookifyService {
	private LookifyRepository lookifyRepository;
	
	public LookifyService(LookifyRepository lookifyRepository){
		this.lookifyRepository = lookifyRepository;
	}
	
	public void create(Song song){
		lookifyRepository.save(song);
	}
	
	public void update(Song song){
		lookifyRepository.save(song);
	}
	
	public void destory(long id){
		lookifyRepository.delete(id);
	}
	
	public Song findById(long id){
		return lookifyRepository.findOne(id);
	}
		
	public ArrayList<Song> all(){
		return (ArrayList<Song>) lookifyRepository.findAll();
	}
	
	public ArrayList<Song> findByArtist(String artist){
		return (ArrayList<Song>) lookifyRepository.findByArtistContaining(artist);
	}
	
	public ArrayList<Song> topten(){
		ArrayList<Song> songs = (ArrayList<Song>)lookifyRepository.OrderByRatingDesc();
		for(int i=0; i<songs.size(); i++){
			if(i>10){
				songs.remove(i);
			}
		}
		return songs;
	}
	
	
}
