package com.jenny.lookify.controllers;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.jenny.lookify.models.Song;
import com.jenny.lookify.services.LookifyService;

@Controller
@RequestMapping("/")
public class LookifyController {
	private LookifyService lookifyService;
	
	public LookifyController(LookifyService lookifyService){
		this.lookifyService = lookifyService;
	}
	
	@RequestMapping("")
	public String index(){
		return "home.jsp";
	}
	
	@RequestMapping("dashboard")
	public String dashboard(Model model){
		model.addAttribute("songs", lookifyService.all());
		return "dashboard.jsp";
	}
	
	
	@RequestMapping("songs/new")
	public String newSong(Model model){
		model.addAttribute("song", new Song());
		return "addnew.jsp";
	}

	
	@PostMapping("songs/new")
	public String create(@Valid @ModelAttribute("song") Song song, BindingResult result, RedirectAttributes flash){
		if(result.hasErrors()){
			flash.addFlashAttribute("errs", result.getAllErrors());
			return "redirect:/songs/new";
		} else {
			lookifyService.create(song);
			return "redirect:/dashboard";
		}		
	}


	@RequestMapping("songs/delete/{id}")
	public String destory(@PathVariable("id") long id){
		lookifyService.destory(id);
		return "redirect:/dashboard";		
	}
	
	
	@RequestMapping("songs/{id}")
	public String song(@PathVariable("id") long id, Model model){
		model.addAttribute("song", lookifyService.findById(id));
		return "song.jsp";
	}	
	
	@RequestMapping("songs/top")
	public String topten(Model model){
		model.addAttribute("songs", lookifyService.topten());
		return "topten.jsp";
	}
	
	
	@PostMapping("search")
	public String search(@RequestParam(value="artist") String artist, Model model){
		model.addAttribute("songs",lookifyService.findByArtist(artist));
		return "artist.jsp";
	}
	

	
	
}
