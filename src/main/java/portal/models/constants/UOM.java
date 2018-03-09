package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public final class UOM {
	
	public static final String MT = "MT";
	public static final String MTRS = "Mtrs";
	public static final String BUNDLES = "Bundles";
	public static final String SQ_MT = "Sq. Mtr.";
	public static final String BAGS = "Bags";
	
	public static List<String> getAllUnits(){
		List<String> units = new ArrayList<String>();
		units.add(MT);
		units.add(MTRS);
		units.add(BUNDLES);
		units.add(SQ_MT);
		units.add(BAGS);
		return units;
	}

}
