I want to create an interactive app based on Seerah book that i have - The life of Prophet Muhammad (PBUH). This is a guide for you to take ideas from. 

                    SEERAH BOOK
                        │
                        ▼
                CONTENT DATABASE
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
           Events     People     Places
             │          │          │
             └──────────┼──────────┘
                        │
                 LESSON ENGINE
                        │
          ┌─────────────┼──────────────┐
          ▼             ▼              ▼
      Story Scene    Interaction    Reflection
          │             │              │
          └─────────────┼──────────────┘
                        ▼
                  CHILD'S JOURNAL
                        │
                        ▼
                  JOURNEY PROGRESS



Tech Stack : 

                 SEERAH WEB APP
                         │
                ┌────────┴────────┐
                │                 │
          APPLICATION          GAME WORLD
                │                 │
        Next.js + React        Phaser
                │                 │
           TypeScript       TypeScript
                │                 │
                └────────┬────────┘


1. Next.js + React

Your main web application.

Use it for:

Home page
Chapter selection
Seerah map navigation
User accounts
Parent dashboard
Progress
Seerah Journal
Settings
Language selection
Chapter menus
AI tutor interface
Content management interface

Next.js gives you the application framework; React gives you the UI.

2. TypeScript

I'd use TypeScript everywhere.

Your project will eventually have objects like:

Chapter
Event
Person
Place
Lesson
Source
Scene
Interaction
Quiz
Achievement
UserProgress

TypeScript will make this much easier to manage than plain JavaScript.

3. 🎮 Phaser — the important one

This is the interactive experience engine.

Use Phaser for:

interactive environments
character/object movement
clicking/tapping objects
animations
puzzles
mini-games
drag-and-drop
map interactions
exploration
particles/effects
scene transitions
interactive storytelling

For example:

React
 └── Chapter Page
       │
       └── Phaser
             ├── Makkah Scene
             ├── Interactive Map
             ├── Objects
             ├── Hotspots
             ├── Puzzle
             └── Story Scene

Ideas for designing different chapters : 

Absolutely. I would give your builder/LLM a **fixed toolbox + several chapter structures**, rather than telling it to make every chapter the same way.

The LLM should read the chapter's major events from your Seerah book, identify the nature of each event, and then **choose the most appropriate experience pattern**.

# 1. Different ways to construct a chapter

A chapter does **not** have to use all interactions. The LLM should select the structure that best fits the content.

### A. Story Journey

Best for a chapter with a clear chronological narrative.

**Structure:**

* Chapter introduction
* Historical context
* Event 1
* Interactive scene
* Event 2
* Exploration/challenge
* Event 3
* Reflection
* Knowledge challenge
* Chapter completion

---

### B. Explore a Place

Best for chapters heavily connected to Makkah, Madinah, Arabia, geography, buildings, markets, tribes, etc.

**Structure:**

* Enter illustrated environment
* Free exploration
* Clickable points of interest
* Discover people/objects/places
* Unlock historical information
* Small challenges
* Final "What did you discover?" activity

---

### C. Timeline Adventure

Best for chapters containing many events over a period of time.

**Structure:**

* Interactive timeline
* Unlock events sequentially
* Each event opens a mini-scene
* Connect causes and consequences
* Reconstruct timeline at the end
* Chapter summary

---

### D. Map + Journey

Best for migration, travel, expeditions, geography and locations.

**Structure:**

* Interactive Arabian map
* Discover starting location
* Follow historical route
* Stop at important locations
* Learn what happened at each location
* Geography challenges
* Complete the journey

---

### E. Mystery / Discovery Chapter

Best when the chapter contains something the child can gradually discover.

**Structure:**

* Introduce a mystery/question
* Explore environment
* Collect clues
* Learn historical facts
* Connect clues
* Reveal the historical event
* Reflection

Example:

> **"Why was Makkah so important?"**

The child discovers trade, geography, the Ka'bah, tribes, routes, etc.

---

### F. Character & Lessons Chapter

Best for chapters where the strongest educational value is character, behavior or relationships.

**Structure:**

* Tell the historical event
* Identify the important character trait
* Historical context
* Interactive scenario
* "What would you do?"
* Apply lesson to a fictional everyday situation
* Add character lesson to Seerah Journal

---

### G. Multi-Scene Storybook

Best for emotionally important or complicated events.

**Structure:**

```text
Scene 1 → Story
Scene 2 → Explore
Scene 3 → Story
Scene 4 → Challenge
Scene 5 → Story
Scene 6 → Reflection
```

The child feels like they are progressing through an illustrated historical story.

---

### H. Mission / Quest Chapter

Best for chapters with several objectives.

Example:

> **Mission: Discover Makkah**

Objectives:

* Find the Ka'bah
* Discover why Makkah was important
* Learn about the Quraysh
* Discover the trade routes
* Complete the knowledge challenge

The child sees:

**3 / 5 objectives completed**

This gives the chapter a game-like feeling without turning sacred history into a conventional game.

---

### I. Investigation / Source Detective

Best for older children and chapters containing different historical narrations or important source material.

**Structure:**

* Learn the event
* Examine source information
* Distinguish established information from later narration/interpretation
* Compare information where appropriate
* Build the historically supported version
* Source summary

This should only be implemented using **scholarly-approved source classifications**, not an LLM making its own judgment.

---

### J. Simulation / System Exploration

Best for concepts rather than individual stories.

Examples:

* How Arabian trade worked
* How a caravan travelled
* Geography of Arabia
* How different regions were connected
* How a city functioned

The child interacts with a simplified system and learns by experimenting.

---

# 2. Master list of interactive ideas

Give this entire list to your LLM as its **interaction toolbox**.

## 🌍 World & Environment

* **Explore an illustrated Makkah/Madinah/Arabia environment**
* Clickable buildings
* Clickable landmarks
* Clickable objects
* Hidden historical discoveries
* Environmental hotspots
* Day/night environmental scenes where historically appropriate
* Explore a marketplace
* Explore a settlement
* Explore a desert environment
* Explore a caravan
* Explore a historical location
* "Find all discoveries" activity
* Zoom into important locations
* Before/after historical environment comparison where reliable
* Interactive panoramic scene
* Ambient environmental sound
* Tap objects to hear/read their historical significance

---

## 🗺️ Geography & Maps

* Interactive Arabia map
* Makkah map
* Madinah map
* Historical route map
* Tap locations to reveal events
* "Find this location" challenge
* Drag location marker to correct place
* Follow a historical route
* Compare two locations
* Discover surrounding regions
* Trade-route visualization
* Mountain/desert/oasis exploration
* Distance/travel visualization
* Location-based event unlocking
* Connect people to places
* Connect events to places

---

## 🕰️ Timeline & History

* Interactive chronological timeline
* Drag events into correct order
* Unlock events chronologically
* "What happened next?"
* "What happened before?"
* Cause → event → consequence
* Connect related events
* Compare events
* Chapter event tree
* Zoomable timeline
* Age/time-period markers where appropriate
* Historical era navigation
* Reconstruct an event sequence
* Find the missing event
* Identify turning points

---

## 📖 Storytelling

* Illustrated story scenes
* Narrated story
* Text + illustration story
* Scene-by-scene progression
* "Continue the story" interaction
* Story pauses where the child explores
* Story pauses with a question
* Story pauses with a prediction
* Reveal the next historical event
* Visual chapter transitions
* Chapter opening cinematic **without depicting the Prophet ﷺ**
* Historical environment establishing shots

---

## 🔍 Discovery

* Hidden-object discovery
* Find important historical objects
* Find locations
* Find people
* Find clues
* Collect historical facts
* Unlock information cards
* Explore hotspots
* "Discover 5 things about Makkah"
* "Find everything connected to this event"
* Knowledge collection
* Historical artifact collection

---

## 👥 People & Relationships

* Interactive people cards
* Relationship map
* Companion network
* Family tree
* Tribe/people relationships
* "Who was connected to this event?"
* Match person → event
* Match person → relationship
* Match person → location
* Character information cards
* Unlock people progressively
* People timeline
* People connected to multiple events

**Important:** establish a consistent scholarly policy for visual representations of named historical figures, and never visually depict the Prophet Muhammad ﷺ.

---

## 🧩 Puzzles

* Drag-and-drop puzzle
* Match pairs
* Match person → event
* Match place → event
* Match event → lesson
* Arrange events chronologically
* Reconstruct a historical sequence
* Assemble a map
* Connect related events
* Complete a historical diagram
* Find the missing piece
* Categorize information
* Sort information into correct groups
* Memory cards
* Spot the correct historical detail

---

## 🧠 Knowledge Challenges

* Multiple choice
* True/false
* Image-based question
* Map question
* Timeline question
* "Who/what/where?"
* "What happened next?"
* "Why was this important?"
* Fill in the missing word
* Drag the correct answer
* Match the answer
* Knowledge checkpoint
* End-of-chapter challenge
* Progressive difficulty
* Review questions from earlier chapters

Don't make these the entire experience. They should **reinforce learning after exploration/storytelling**.

---

# 3. Character & Moral Learning

This should be one of the strongest parts of the app.

* "What can we learn from this?"
* Character trait cards
* Honesty scenario
* Patience scenario
* Mercy scenario
* Courage scenario
* Forgiveness scenario
* Generosity scenario
* Justice scenario
* Keeping promises scenario
* Trustworthiness scenario
* Helping others scenario
* Difficult-choice scenario
* Everyday-life application
* "What would you do?" activity
* Reflection question
* Personal goal
* Add lesson to Seerah Journal

### Important rule:

The child should **not role-play as the Prophet ﷺ**.

Instead:

> "Here is what happened. What lesson can we learn from it?"

or

> "Imagine you encounter a similar situation in your own life. What would you do?"

That preserves the educational purpose and respect.

---

# 4. Quest & Mission Mechanics

* Chapter mission
* Multiple objectives
* Progress tracker
* Discovery checklist
* Unlockable locations
* Unlockable knowledge cards
* Unlockable character cards
* Chapter badges
* "Complete your journey"
* Hidden bonus discoveries
* Chapter completion certificate
* Mastery percentage
* Optional challenge after completion
* Revisit previously completed chapters

---

# 5. Simulation Ideas

Use these when the book provides enough information to support them.

* Caravan/trade simulation
* Travel planning
* Geography simulation
* Route planning
* Resource management
* City exploration
* Historical marketplace
* Simple cause-and-effect simulation
* Population/tribe relationship visualization
* Trade-route visualization
* Environmental/geographical exploration
* Build/reconstruct historical environment
* Compare geographical regions

Keep simulations **educational**, not speculative.

---

# 6. Audio & Immersion

* Professional narration
* Child-friendly narration
* Optional text/audio toggle
* Ambient desert sounds
* Marketplace atmosphere
* Wind/environment sounds
* Location-specific ambience
* Sound cues for discoveries
* Spoken questions
* Spoken explanations
* Pronunciation assistance for Arabic names
* Optional Bangla/English narration

Don't add dramatic sound effects to sacred or emotionally sensitive events simply to make them "more exciting."

---

# 7. Seerah Journal

Every chapter can contribute to a persistent journal.

* Events learned
* Places discovered
* People learned about
* Important concepts
* Character lessons
* Knowledge cards
* Timeline milestones
* Maps discovered
* Questions completed
* Reflections
* Personal lessons
* Chapter achievements

Example:

```text
MY SEERAH JOURNAL

📍 Places discovered       14
📖 Events learned          31
👥 People learned          22
🌟 Character lessons       11
🧠 Knowledge mastery       87%
🗺️ Regions explored         8
```

---

# 8. Source & Authenticity Layer

This is particularly important for your project because you are basing it on a specific Seerah book.

* "Source" button on important information
* Book reference
* Chapter reference
* Page reference internally
* Qur'an reference where applicable
* Hadith reference where applicable
* Source notes
* Scholarly review status
* Clearly distinguish historical fact from illustration
* Clearly distinguish source material from educational interpretation
* Flag narrations where scholarly classification requires it

The LLM should **never invent a quote, conversation, emotion, event detail, date, or historical fact merely to make a scene more interesting.**

---

# 9. AI Features

AI should sit **around your curated Seerah content**, not replace it.

* Ask a question about the chapter
* "Explain this like I'm 7"
* "Explain this more simply"
* Generate age-appropriate quiz questions
* Personalized revision
* Conversational tutor
* Vocabulary explanation
* Arabic term explanation
* Bangla ↔ English explanation
* Ask "Why was this important?"
* Ask "What did we learn?"
* Review previous chapters
* Adaptive difficulty

The AI should answer from your **approved Seerah knowledge base**.

---

# 10. Special Chapter Mechanics

The LLM can recognize certain content patterns and automatically choose a special mechanic.

### If chapter contains a journey:

→ **Map + Route + Location Discovery**

### If chapter contains many chronological events:

→ **Timeline + Event Reconstruction**

### If chapter describes a place:

→ **3D/2D Exploration + Hotspots**

### If chapter describes people:

→ **People Cards + Relationship Graph**

### If chapter teaches character:

→ **Story + Moral Scenario + Reflection**

### If chapter describes society:

→ **Interactive Marketplace / Society Simulation**

### If chapter involves geography:

→ **Interactive Map + Geography Challenge**

### If chapter contains a major historical turning point:

→ **Story Journey + Cause/Effect**

### If chapter has a complex sequence:

→ **Scene-by-Scene Interactive Story**

### If chapter has source-sensitive material:

→ **Source/Evidence Layer**

### If chapter contains several smaller events:

→ **Mission Board + Multiple Mini-Experiences**

---

# 11. The LLM's chapter-generation rule

I would give your builder something like this as a core instruction:

> **For every Seerah chapter, first extract the major historical events, people, places, concepts and lessons from the provided source material. Then determine the dominant educational purpose of the chapter. Select 2–5 interaction mechanics that naturally fit the chapter. Do not force every mechanic into every chapter. Construct the chapter as an immersive educational experience consisting of story, exploration, interaction, knowledge reinforcement and reflection. Keep all historical content faithful to the source material. Never invent historical facts, dialogue, thoughts, emotions or events. Never depict Prophet Muhammad ﷺ. Clearly distinguish historically sourced information from illustrative/game elements.**

Then have it output something like:

```text
CHAPTER
↓
1. What is this chapter teaching?
↓
2. Major historical events
↓
3. Important people
↓
4. Important places
↓
5. Important concepts
↓
6. Character lessons
↓
7. Best chapter structure
↓
8. Selected interactions
↓
9. Scenes
↓
10. Assets required
↓
11. Animations required
↓
12. Audio required
↓
13. Challenges
↓
14. Reflection
↓
15. Journal rewards
↓
16. Source references
```

### And one rule I'd make explicit:

**The LLM should choose the interaction, not the other way around.**

Don't say:

> "Every chapter needs a map, puzzle, quiz, character system and simulation."

Instead:

> **"Understand what this chapter contains, then choose the most appropriate combination of experiences."**

That will keep the app from becoming repetitive.

---

# 12. Mandatory Visual Artwork & Image Generation Rule

Whenever creating or expanding any interactive chapter or section in the app, the agent **MUST automatically generate high-resolution visual artwork** (`generate_image`) alongside building the interactive Phaser scenes and React components. **The user should never have to manually ask the agent to create images.**

### Core Requirements:

1. **Automatic High-Res Asset Creation:**
   - Generate crisp 16:9 / 1:1 image assets using `generate_image` for all backgrounds, environments, landscapes, ancient architecture, maps, and UI hero banners.
   - Save generated images to `public/assets/images/` and preload them in `BootScene.ts`.
   - Do NOT rely on plain procedural color shapes or text-heavy layouts when high-resolution artwork can be generated.

2. **Strict Non-Human Depiction Constraints:**
   - Prompts for `generate_image` MUST strictly focus on **landscapes, desert terrain, architecture, historical parchment maps, and objects**.
   - **NEVER visually depict Prophet Muhammad ﷺ.**
   - **NEVER generate human faces or figures** (always include `no humans, landscape artwork, high resolution` in prompts).

3. **Illustration-Heavy Storybook Design:**
   - Combine high-res artwork backgrounds with rich Phaser interactivity (particle fountain sprays, day-to-night lighting transitions, object interactions, interactive puzzles).
   - Keep text concise, child-friendly, and fully bilingual (Bangla + English).

---

# 13. Mandatory Strict Source Text Extraction & Implementation Rule

Whenever creating or expanding any chapter, section, interactive scene, quiz, or modal in the app, the agent **MUST carefully extract texts from the user's provided book screenshots**, thoroughly analyze and understand the extracted narrative, and directly implement it into the interactive app engine.

### Core Requirements:
1. **Meticulous Screenshot Text Extraction & Deep Understanding:**
   - The agent MUST carefully inspect and extract 100% of the text from uploaded page screenshots in `chapters/screenshots/` into corresponding Markdown extractions (e.g. `1a. Arab.md`, `1b. Arab.md`, `1c. Arab.md`).
   - The agent MUST deeply analyze, comprehend, and structure the historical context, major events, people, places, concepts, and moral lessons from the extracted text before building any interactive feature.

2. **Zero External Knowledge Inventions:**
   - The agent MUST NOT use its own general AI training knowledge or external assumptions to invent historical facts, dates, quotes, narrations, or interpretations.
   - All historical narratives, summaries, quizzes, character lessons, and interactive UI content MUST be strictly derived from the exact text extractions of the user's book screenshots.

3. **Faithful App Implementation:**
   - Translate the extracted historical narrative directly into Phaser scenes, interactive hotspots, quizzes, and modal cards without skipping authentic details or distorting facts.
   - Preserve 100% historical fidelity and alignment with the book *Ar-Raheeq Al-Makhtum*.


