package org.tutorial.tutoringtutorial.tutorial;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TutorialGuideControllerTests {

  @LocalServerPort
  private int port;

  @Test
  void servesTheTutorialGuide() throws Exception {
    var client = HttpClient.newHttpClient();
    var guideRequest = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/guide")).GET().build();
    var guideResponse = client.send(guideRequest, HttpResponse.BodyHandlers.ofString());
    var versionRequest = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/version")).GET().build();
    var versionResponse = client.send(versionRequest, HttpResponse.BodyHandlers.ofString());

    assertTrue(guideResponse.statusCode() == 200);
    assertTrue(guideResponse.body().contains("Microservices and Kubernetes Tutorial"));
    assertTrue(guideResponse.body().contains("\"baselineVersion\""));
    assertTrue(guideResponse.body().contains("\"versioningStrategy\""));
    assertTrue(guideResponse.body().contains("\"checkpointWorkflow\""));
    assertTrue(guideResponse.body().contains("\"requirements\""));
    assertTrue(guideResponse.body().contains("\"chapter\":0"));
    assertTrue(guideResponse.body().contains("\"git\":\"chapter-0-launch\""));
    assertTrue(versionResponse.statusCode() == 200);
    assertTrue(versionResponse.body().contains("\"major\":0"));
    assertTrue(versionResponse.body().contains("\"minor\":1"));
  }
}
