package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import portal.dao.InvoiceDao;
import portal.dao.VehicleDao;
import portal.models.Vehicle;
import portal.models.constants.VehicleType;

@RestController
public class VehicleController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(VehicleController.class);
	
	@Autowired
	private VehicleDao vehicleDao;
	
	@Autowired
	private InvoiceDao invoiceDao;

	@ResponseBody
	@RequestMapping(value = "/vehicle/getAll", method = RequestMethod.GET)
	public List<Vehicle> getAllVehicles() {
		logger.info("Fetching all vehicles");
		return vehicleDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/vehicle/getTypes", method = RequestMethod.GET)
	public List<String> getAllTypes() {
		return VehicleType.getAllVehicleTypes();
	}

	@RequestMapping(value = "/vehicle/save", method = RequestMethod.POST)
	public void saveVehicle(@RequestBody Vehicle vehicle) {
		vehicleDao.save(vehicle);
	}

	@RequestMapping(value = "/vehicle/update", method = RequestMethod.POST)
	public void updateVehicle(@RequestBody Vehicle vehicle) {
		vehicleDao.save(vehicle);
	}
	
	@RequestMapping(value = "/vehicle/delete", method = RequestMethod.POST)
	public void deleteVehicle(@RequestBody Vehicle vehicle) throws Exception {
		if(invoiceDao.findByDispatchDetailVehicle(vehicle).size() > 0) {
			throw new Exception("There are invoices mapped to this vehicle already.");
		}
		vehicleDao.delete(vehicle);
	}

}
