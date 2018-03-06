package portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "transporters")
public class Transporter {

	@Id
	@Column(name = "transporter_id")
	private Integer transporterId;
	
	@NotNull
	@Column(name = "transporter_name")
	private String transporterName;
	
	@Column(name = "transporter_pan")
	private String transporterPan;
	
	@Column(name = "contact_person")
	private String contactPerson;
	
	@Column(name = "contact_number")
	private String contactNumber;

}
