package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {

}
