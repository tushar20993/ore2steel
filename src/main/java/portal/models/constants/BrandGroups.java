package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public final class BrandGroups {
	
	public static final String MAIN = "Main / Primary";
	public static final String ROLLING = "Rolling / Secondary";
	
	public static List<String> getAllGroups(){
		List<String> groups = new ArrayList<String>();
		groups.add(MAIN);
		groups.add(ROLLING);
		return groups;
	}

}
