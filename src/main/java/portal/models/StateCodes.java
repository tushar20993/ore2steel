package portal.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class StateCodes {
	
	@Id
	@GeneratedValue
	@Column(name = "state_codes_id")
	private Integer stateCodesId;
	
	@NotNull
	@Column(name = "state_name")
	private String stateName;
	
	@NotNull
	@Column(name = "state_code")
	private String stateCode;

	public Integer getStateCodesId() {
		return stateCodesId;
	}

	public void setStateCodesId(Integer stateCodesId) {
		this.stateCodesId = stateCodesId;
	}

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
