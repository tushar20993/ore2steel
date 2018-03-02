package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Item {
	
	@Id
	private Integer itemId;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "hsn_code")
	private String hsnCode;
	
	@ManyToOne
	private Brand brand;
	

}
