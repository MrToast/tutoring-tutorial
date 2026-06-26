package org.tutorial.tutoringtutorial.tutorial;

public record TutorialVersion(int major, int minor, int patch, String milestone) {

  public String label() {
    return major + "." + minor + "." + patch;
  }
}
