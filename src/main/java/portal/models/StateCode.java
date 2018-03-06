package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "state_code")
public class StateCode {
		
	@Id
	@Column(name = "state_name")
	private String stateName;
	
	@NotNull
	@Column(name = "state_code")
	private String stateCode;

	
	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getStateCode() {
		return stateCode;
	}

	public void setStateCode(String stateCode) {
		this.stateCode = stateCode;
	}
	
	

}
