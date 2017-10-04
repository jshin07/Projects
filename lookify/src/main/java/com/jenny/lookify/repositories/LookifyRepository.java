package com.jenny.lookify.repositories;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jenny.lookify.models.Song;

@Repository
public interface LookifyRepository extends CrudRepository <Song, Long> {
	public ArrayList<Song> findByArtistContaining(String search);
	public ArrayList<Song> OrderByRatingDesc();
}
