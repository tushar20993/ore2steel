package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public final class GSTRegistrationType {

	public static final String REGISTERED = "REGISTERED";
	public static final String UNREGISTERED = "UNREGISTERED";
	public static final String CONSUMER = "CONSUMER";

	public static List<String> getRegistrationTypes() {
		List<String> registrationTypes = new ArrayList<String>();
		registrationTypes.add(REGISTERED);
		registrationTypes.add(UNREGISTERED);
		registrationTypes.add(CONSUMER);
		return registrationTypes;
	}

}
