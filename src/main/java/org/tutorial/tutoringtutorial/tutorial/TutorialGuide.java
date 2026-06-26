package org.tutorial.tutoringtutorial.tutorial;

import java.util.List;

public record TutorialGuide(
    String title,
    String subtitle,
    String chapterZero,
    String referenceTagStrategy,
    String versioningStrategy,
    String checkpointWorkflow,
    TutorialRequirements requirements,
    TutorialVersion baselineVersion,
    List<TutorialChapter> chapters
) {
}
