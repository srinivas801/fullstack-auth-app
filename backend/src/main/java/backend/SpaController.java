package backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

	@GetMapping({ "/home", "/register", "/login" })
	public String forwardReactRoutes() {
		return "forward:/index.html";
	}
}
