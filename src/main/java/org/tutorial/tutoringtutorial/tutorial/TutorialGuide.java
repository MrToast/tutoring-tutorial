package org.tutorial.tutoringtutorial.tutorial;

import java.util.List;

public record TutorialGuide(
    String title,
    String subtitle,
    String useCase,
    String chapterZero,
    List<String> chapterZeroChecklist,
    String nextChapter,
    String referenceTagStrategy,
    String versioningStrategy,
    String checkpointWorkflow,
    String branchingStrategy,
    TutorialRequirements requirements,
    TutorialVersion baselineVersion,
    List<TutorialChapter> chapters
) {
}
