---
name: fubball-narrative
description: "Handles Fubball's narrative lore, British English football terminology, election directives, Ledger rulebook progression, and global ticker message system."
license: MIT
metadata:
  author: fubball
---

# Fubball Narrative, Lore & Elections

## When to Apply

Activate this skill when working on:

- Authoring election directive handlers (`App\Services\Election\Handlers\Directives`)
- Modifying or unlocking pages and rules in The Ledger (`App\Services\Ledger`, `LedgerPage`)
- Crafting lore copy, commentary strings, death records, and item flavor text
- Managing global ticker messages and semantic broadcasting lanes (`database/settings/defaults/fubball_messages.php`)

## Lore & Terminology Standards

- **British English Football Terminology**: Use strictly British English football terms:
  - _pitch_ (not field), _boots_ (not cleats), _dressing room_ (not locker room), _tunnel_, _referee_ (not ref/umpire), _linesman_, _manager_ (not coach), _fixtures_, _standings_.
- **Fubballs**: In-world balls are strictly called **"fubballs"**, never "footballs".
- **Atmospheric Tone**: Maintain a mysterious, deadpan, darkly comic British/Yorkshire tone inspired by Blaseball. Do not break immersion by exposing technical code variables or raw math in lore text.

## Elections & Directive Handlers

- Each directive handler implements `App\Contracts\ElectionDirectiveHandler`.
- Result descriptions and ticker broadcasts must return ordered arrays:
  ```php
  public function getResultDescriptions(): array
  public function getTickerMessages(): array
  ```
- Handlers that modify the rulebook must implement `App\Contracts\ModifiesLedger` and execute `modifyLedger()`.

## The Ledger Progression

- Pages unlock progressively based on in-world triggers.
- Use stable keyed blocks (`BlockKey`) to unlock hidden paragraphs, mutate existing text, or append new rules.

## Global Ticker Semantic Lanes

- `interrupt`: High-priority breaking alerts (immediately flushes queue and broadcasts).
- `news`: Season elections, major player incidents, rulebook updates.
- `match`: Live game action commentary.
- `flavor`: Ambient atmospheric world flavor.
