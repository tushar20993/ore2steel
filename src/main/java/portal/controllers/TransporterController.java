package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.TransporterDao;
import portal.models.Transporter;

@RestController
public class TransporterController {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(TransporterController.class);

	@Autowired
	private TransporterDao transporterDao;

	@ResponseBody
	@RequestMapping(value = "/transporter/getAll", method = RequestMethod.GET)
	public List<Transporter> getAllTransporters() {
		return transporterDao.findAll();
	}

	@RequestMapping(value = "/transporter/save", method = RequestMethod.POST)
	public void saveTransporter(@RequestBody Transporter transporter) {
		transporterDao.save(transporter);
	}

	@RequestMapping(value = "/transporter/update", method = RequestMethod.POST)
	public void updateTransporter(@RequestBody Transporter transporter) {
		transporterDao.save(transporter);
	}

}
