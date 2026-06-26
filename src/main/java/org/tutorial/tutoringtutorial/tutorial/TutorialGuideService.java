package org.tutorial.tutoringtutorial.tutorial;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TutorialGuideService {

  private static final String GUIDE_RESOURCE = "tutorial/guide.json";

  private final TutorialGuide guide;
  private final Map<String, TutorialChapter> chaptersBySlug;

  public TutorialGuideService(ObjectMapper objectMapper) {
    this.guide = loadGuide(objectMapper);
    this.chaptersBySlug = indexChapters(guide);
  }

  public TutorialGuide guide() {
    return guide;
  }

  public TutorialChapter chapter(String slug) {
    var chapter = chaptersBySlug.get(slug);
    if (chapter == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown chapter: " + slug);
    }
    return chapter;
  }

  private TutorialGuide loadGuide(ObjectMapper objectMapper) {
    var resource = new ClassPathResource(GUIDE_RESOURCE);
    if (!resource.exists()) {
      throw new IllegalStateException("Missing tutorial guide resource: " + GUIDE_RESOURCE);
    }

    try (InputStream inputStream = resource.getInputStream()) {
      return objectMapper.readValue(inputStream, TutorialGuide.class);
    } catch (IOException ex) {
      throw new IllegalStateException("Unable to load tutorial guide resource: " + GUIDE_RESOURCE, ex);
    }
  }

  private Map<String, TutorialChapter> indexChapters(TutorialGuide guide) {
    Map<String, TutorialChapter> chapters = new LinkedHashMap<>();
    for (TutorialChapter chapter : guide.chapters()) {
      chapters.put(chapter.slug(), chapter);
    }
    return chapters;
  }
}
