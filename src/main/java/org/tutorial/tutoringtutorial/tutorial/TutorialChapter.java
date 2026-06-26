package org.tutorial.tutoringtutorial.tutorial;

import java.util.List;

public record TutorialChapter(
    int chapter,
    String slug,
    String title,
    String summary,
    String complexity,
    String outcome,
    TutorialVersion version,
    List<String> learningGoals,
    List<String> compareChecklist,
    List<String> sourceCommands,
    List<String> starterCommands,
    TutorialTags tags
) {
}
