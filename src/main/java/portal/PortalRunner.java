package portal;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class PortalRunner {

	public static void main(String[] args) {
		SpringApplication.run(PortalRunner.class, args);

	}

}
