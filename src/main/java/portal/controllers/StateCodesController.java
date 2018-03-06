package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.StateCodesDao;
import portal.models.StateCode;

@RestController
public class StateCodesController {

	@Autowired
	private StateCodesDao stateCodesDao;
	
	@ResponseBody
	@RequestMapping(value = "/state_code/getAll", method = RequestMethod.GET)
	public List<StateCode> getAllStateCodes(){
		return stateCodesDao.findAll();
	}
}
