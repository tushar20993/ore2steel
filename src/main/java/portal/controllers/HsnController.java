package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.HsnDao;
import portal.models.Hsn;

@RestController
public class HsnController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(HsnController.class);

	@Autowired
	private HsnDao hsnDao;

	@ResponseBody
	@RequestMapping(value = "/hsn/getAll", method = RequestMethod.GET)
	public List<Hsn> getAllHsnsStartingWith(@RequestParam("startingWith") String startingWith) {
		logger.info("Fetching all HSNs {}", startingWith);

		List<Hsn> hsns = hsnDao.findByHsnThatStartsWith(startingWith);
		return hsns;
	}

}
