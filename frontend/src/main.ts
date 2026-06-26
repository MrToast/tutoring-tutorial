type TutorialTags = {
  git: string;
  docker: string;
  kubernetes: string;
};

type TutorialChapter = {
  chapter: number;
  slug: string;
  title: string;
  summary: string;
  complexity: string;
  outcome: string;
  version: TutorialVersion;
  learningGoals: string[];
  compareChecklist: string[];
  sourceCommands: string[];
  starterCommands: string[];
  tags: TutorialTags;
};

type TutorialGuide = {
  title: string;
  subtitle: string;
  chapterZero: string;
  referenceTagStrategy: string;
  versioningStrategy: string;
  baselineVersion: TutorialVersion;
  requirements: TutorialRequirements;
  checkpointWorkflow: string;
  chapters: TutorialChapter[];
};

type TutorialRequirements = {
  platforms: string[];
  tools: string[];
  notes: string[];
};

type TutorialVersion = {
  major: number;
  minor: number;
  patch: number;
  milestone: string;
};

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

loadGuide()
    .then((guide) => renderGuide(app, guide))
    .catch((error) => renderError(app, error));

async function loadGuide(): Promise<TutorialGuide> {
  const response = await fetch('/api/guide');
  if (!response.ok) {
    throw new Error(`Unable to load guide: ${response.status}`);
  }
  return response.json() as Promise<TutorialGuide>;
}

function renderGuide(root: HTMLDivElement, guide: TutorialGuide): void {
  root.replaceChildren(
      hero(guide),
      section('Requirements', 'A Linux or macOS machine is enough to recreate the tutorial step by step. Windows is left as an exercise to the reader.', requirementsPanel(guide.requirements)),
      section('From source', guide.checkpointWorkflow, sourceWorkflowPanel(guide)),
      section('Versioning', 'Use semantic versions as the tutorial grows. Each chapter advances the minor version and keeps a milestone tag to compare against.', versionPanel(guide)),
      section('Roadmap', 'Each chapter increases the surface area: first the guide, then service boundaries, then deployable containers, then Kubernetes.', chaptersGrid(guide.chapters)),
      section('Reference tags', 'Use the tags to compare your work against a known checkpoint for each chapter.', tagsGrid(guide.chapters)),
      section('How to compare your work', 'The same checkpoint can be compared three ways: code, image, and cluster state.', comparisonPanel(guide)),
      footer(guide)
  );
}

function renderError(root: HTMLDivElement, error: unknown): void {
  const panel = element('section', 'panel');
  panel.append(
      heading('h2', 'Unable to load the tutorial'),
      copy(error instanceof Error ? error.message : 'Unknown error')
  );
  root.replaceChildren(panel);
}

function hero(guide: TutorialGuide): HTMLElement {
  const wrapper = element('section', 'hero');
  wrapper.append(
      paragraph('eyebrow', 'Tutorial chapter 0'),
      heading('h1', guide.title),
      copy(guide.subtitle, 'hero-copy'),
      versionPanel(guide),
      checklist([
        guide.chapterZero,
        guide.referenceTagStrategy,
        'Open the page at http://localhost:8080',
        'Read the roadmap below',
        'Use the tag rows as comparison anchors'
      ])
  );
  return wrapper;
}

function chaptersGrid(chapters: TutorialChapter[]): HTMLElement {
  const wrapper = element('div', 'chapter-grid');
  for (const chapter of chapters) {
    const card = element('article', 'chapter-card');
    card.id = chapter.slug;
    card.append(
        badge(`Chapter ${chapter.chapter} · ${chapter.complexity}`),
        heading('h3', chapter.title),
        copy(chapter.summary, 'summary'),
        copy(chapter.outcome, 'small'),
        chapterSection('Learn by doing', chapter.learningGoals),
        chapterSection('Compare against the tag', chapter.compareChecklist),
        chapterSection('Build from source', chapter.sourceCommands),
        commands(chapter.starterCommands)
    );
    wrapper.append(card);
  }
  return wrapper;
}

function tagsGrid(chapters: TutorialChapter[]): HTMLElement {
  const wrapper = element('div', 'tag-grid');
  for (const chapter of chapters) {
    const panel = element('section', 'panel');
    panel.append(
        heading('h3', chapter.title),
        tagRow('Version', versionLabel(chapter.version)),
        tagRow('Git tag', chapter.tags.git),
        tagRow('Docker tag', chapter.tags.docker),
        tagRow('Kubernetes tag', chapter.tags.kubernetes)
    );
    wrapper.append(panel);
  }
  return wrapper;
}

function comparisonPanel(guide: TutorialGuide): HTMLElement {
  const panel = element('section', 'panel');
  const firstChapter = guide.chapters[0];

  panel.append(
      heading('h3', 'Compare chapter 0'),
      copy('Chapter 0 should match your local work on three levels: the page layout, the reference tags, and the Docker-ready launch path.'),
      checklist([
        `Compare source with ${firstChapter.tags.git}`,
        `Compare the image name with ${firstChapter.tags.docker}`,
        `Compare the deployable label with ${firstChapter.tags.kubernetes}`,
        `Confirm the version starts at ${versionLabel(guide.baselineVersion)}`
      ]),
      element('div', 'code')
  );

  const code = panel.querySelector('.code');
  if (code) {
    code.textContent = [
      `git diff ${firstChapter.tags.git}..HEAD`,
      `docker build -t ${firstChapter.tags.docker} .`,
      `kubectl rollout status deployment/tutorial`
    ].join('\n');
  }

  return panel;
}

function footer(guide: TutorialGuide): HTMLElement {
  const footer = element('footer', 'footer');
  footer.textContent = `${guide.title} · ${versionLabel(guide.baselineVersion)} · ${guide.versioningStrategy}`;
  return footer;
}

function versionPanel(guide: TutorialGuide): HTMLElement {
  const panel = element('div', 'panel');
  panel.append(
      heading('h3', `Current version: ${versionLabel(guide.baselineVersion)}`),
      copy(guide.versioningStrategy),
      tagRow('Milestone', guide.baselineVersion.milestone)
  );
  return panel;
}

function requirementsPanel(requirements: TutorialRequirements): HTMLElement {
  const panel = element('div', 'panel');
  panel.append(
      heading('h3', 'What you need'),
      listGroup('Platform', requirements.platforms),
      listGroup('Tools', requirements.tools),
      listGroup('Notes', requirements.notes)
  );
  return panel;
}

function sourceWorkflowPanel(guide: TutorialGuide): HTMLElement {
  const panel = element('div', 'panel');
  panel.append(
      heading('h3', 'Skip forward from source'),
      copy('Each chapter can be recreated from Git by checking out the chapter tag and rebuilding locally.'),
      checklist([
        'git checkout <chapter-tag>',
        'make dev'
      ]),
      copy(`Start with ${guide.chapters[0].tags.git} if you want to rebuild Chapter 0 from scratch.`)
  );
  return panel;
}

function listGroup(title: string, items: string[]): HTMLElement {
  const wrapper = element('div');
  wrapper.append(heading('h4', title), checklist(items));
  return wrapper;
}

function section(title: string, description: string, content: HTMLElement): HTMLElement {
  const wrapper = element('section', 'section');
  wrapper.append(heading('h2', title), copy(description), content);
  return wrapper;
}

function checklist(items: string[]): HTMLElement {
  const list = document.createElement('ul');
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.append(li);
  }
  return list;
}

function commands(items: string[]): HTMLElement {
  const wrapper = element('div', 'code');
  wrapper.textContent = items.join('\n');
  return wrapper;
}

function chapterSection(title: string, items: string[]): HTMLElement {
  const wrapper = element('div');
  wrapper.append(heading('h4', title), checklist(items));
  return wrapper;
}

function tagRow(label: string, value: string): HTMLElement {
  const row = element('div', 'tag-row');
  row.append(tagLabel(label), tagValue(value));
  return row;
}

function tagLabel(value: string): HTMLElement {
  const span = document.createElement('span');
  span.className = 'tag-label';
  span.textContent = value;
  return span;
}

function tagValue(value: string): HTMLElement {
  const span = document.createElement('span');
  span.className = 'tag-pill';
  span.textContent = value;
  return span;
}

function versionLabel(version: TutorialVersion): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}

function badges(values: string[]): HTMLElement {
  const wrapper = element('div', 'meta-grid');
  for (const value of values) {
    wrapper.append(badge(value));
  }
  return wrapper;
}

function pills(values: string[]): HTMLElement {
  return badges(values);
}

function badge(value: string): HTMLElement {
  const span = document.createElement('span');
  span.className = 'pill';
  span.textContent = value;
  return span;
}

function paragraph(className: string, value: string): HTMLElement {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = value;
  return p;
}

function copy(value: string, className = ''): HTMLElement {
  const p = document.createElement('p');
  if (className) {
    p.className = className;
  }
  p.textContent = value;
  return p;
}

function heading(tag: 'h1' | 'h2' | 'h3' | 'h4', value: string): HTMLElement {
  const el = document.createElement(tag);
  el.textContent = value;
  return el;
}

function element(tag: string, className?: string): HTMLElement {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  return el;
}
