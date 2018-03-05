package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Site;
import portal.models.embeddables.SiteId;

public interface SiteDao extends JpaRepository<Site, SiteId>{
	
	public Integer countBySiteIdCompanyCompanyId(Integer companyId);

}
