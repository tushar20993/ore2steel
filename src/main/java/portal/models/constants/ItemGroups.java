package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public class ItemGroups {

	public static final String ITEM = "Item";
	public static final String TAX = "Rates & Taxes";
	public static final String OTHERS = "Others";
	
	public static List<String> getAllGroups(){
		List<String> groups = new ArrayList<String>();
		groups.add(ITEM);
		groups.add(TAX);
		groups.add(OTHERS);
		return groups;
	}

}
