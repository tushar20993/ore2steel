package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Site;
import portal.models.embeddables.SiteId;

public interface SiteDao extends JpaRepository<Site, SiteId> {

	public Integer countBySiteIdCompanyCompanyId(Integer companyId);

	public List<Site> findBySiteIdCompanyCompanyId(Integer companyId);

}
