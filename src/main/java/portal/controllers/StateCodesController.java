package portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.StateCodesDao;

@RestController
@RequestMapping(name = "/state_codes")
public class StateCodesController {

	@Autowired
	private StateCodesDao stateCodesDao;
}
