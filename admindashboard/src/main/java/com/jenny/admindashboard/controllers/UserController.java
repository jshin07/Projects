package com.jenny.admindashboard.controllers;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jenny.admindashboard.models.Role;
import com.jenny.admindashboard.models.User;
import com.jenny.admindashboard.services.RoleService;
import com.jenny.admindashboard.services.UserService;
import com.jenny.admindashboard.validator.UserValidator;

@Controller
public class UserController {
	private UserService userService;
	private RoleService roleService;
	private UserValidator userValidator;
	
	public UserController(UserService userService, RoleService roleService, UserValidator userValidator){
		this.userService= userService;
		this.roleService = roleService;
		this.userValidator = userValidator;
	}
	
// TO VIEW MAIN LOG IN AND REGISTRATION PAGE --LOGREG.JSP
	@RequestMapping(value= {"/login", "/register"})
	public String logReg(@Valid @ModelAttribute("user")User user, @RequestParam(value="error", required=false) String error, @RequestParam(value="logout", required=false) String logout,  Model model){
		if(error != null) {
            model.addAttribute("errorMessage", "Invalid Credentials.");
        }
        if(logout != null) {
            model.addAttribute("logoutMessage", "Logout Successfull!");
        }
		return "logReg.jsp";
	}

// TO REGISTER NEW USER 
	@PostMapping("/register")
	public String register(@Valid @ModelAttribute("user")User user, BindingResult result, Model model){
		userValidator.validate(user, result);
		
		if(result.hasErrors()){
			return "logReg.jsp";
		}	
		if(roleService.findByName("ROLE_ADMIN").getUsers().size()<1){
			userService.saveWithAdminRole(user);
		} else{
			userService.saveWithUserRole(user);			
		}	
		return "redirect:/login";
	}

	
// AFTER POSTMAPPING FROM LOGIN (BACK-END) TO DETERMIN ADMIN OR USER-- THEN REROUTE
	@RequestMapping(value={"/"})
	public String reroute(Principal principal, Model model){
		String email= principal.getName();
		User user= userService.findByEmail(email);
		userService.update(user);
		if (user.isAdmin()){
			return "redirect:/admin";
		} else {
			return "redirect:/dashboard";
		}
	}

	@RequestMapping("/admin")
	public String admin(Principal principal, Model model){
		String email= principal.getName();
		User user= userService.findByEmail(email);
//		userService.update(user);
		model.addAttribute("currentUser", user);
		model.addAttribute("allUsers", userService.all());

		System.out.println(userService.all());
		return "admin.jsp";
	}
	
	@RequestMapping("/dashboard")
	public String dashboard(Principal principal, Model model){
		String email= principal.getName();
		User user= userService.findByEmail(email);
		userService.update(user);
		model.addAttribute("currentUser", user);
		return "dashboard.jsp";
	}
	
	@RequestMapping("/delete/{id}")
	public String delete(@PathVariable("id")Long id){
		userService.delete(id);
		return "redirect:/admin";
	}
	
	@RequestMapping("/makeadmin/{id}")
	public String makeadmin(@PathVariable("id")Long id){
		User user= userService.findById(id);
		List<Role> roleList= user.getRoles();
		roleList.add(roleService.findByName("ROLE_ADMIN"));
		userService.update(user);
		return "redirect:/admin";
	}
	
}
