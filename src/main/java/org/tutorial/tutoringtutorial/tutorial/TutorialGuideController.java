package org.tutorial.tutoringtutorial.tutorial;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TutorialGuideController {

  private final TutorialGuideService guideService;

  public TutorialGuideController(TutorialGuideService guideService) {
    this.guideService = guideService;
  }

  @GetMapping("/guide")
  public TutorialGuide guide() {
    return guideService.guide();
  }

  @GetMapping("/version")
  public TutorialVersion version() {
    return guideService.guide().baselineVersion();
  }

  @GetMapping("/chapters")
  public List<TutorialChapter> chapters() {
    return guideService.guide().chapters();
  }

  @GetMapping("/chapters/{slug}")
  public TutorialChapter chapter(@PathVariable String slug) {
    return guideService.chapter(slug);
  }
}
