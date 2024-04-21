# Seblack Hot Frontend

I hope this still can be count-able for the task...
---

Hello, my name is M.RIzkiansyah (you can call me Rizki)

This is my very first time direct coding using Ember.js, which previously
I always using React.js and it's framework the Next.js from Vercel.

Current condition:
- I really interested to learn Ember.js and Loopback 3 (the required stack)
  on this task that given by BotDistrik, but I need to finish other task too
  so, I feel sorry if I unable to create test unit.
- For test issue, probably if you check the BE/LoopBack3 repo, I told this
  `I don't understand what test unit work, how to write it, or else` so, by
  skip this, I tried to refine the code on other aspects.
- This is the first time I work with Ember.js, and also the LoopBack 3.x
  So it's just like, learning by doing, practice while swinging.
- I don't know in depth of Ember.js, so basically I try to integrate the
  unusual style in Ember.js (like the Copilot says, don't use other state 
  management because Ember has it's built up state management), and i keep
  using Zustand to overcome steep curve learning.
- After understand some code, now I know using Zustand on Ember.js. even for
  some code there might be still stuck with service, that on late days: the
  component js are not requiring service instead can call directly to stores

---
## Documentation

### Helpers
I made some helpers here but mostly used was `eq`, it's like to check between
two value could be same each other.

### Layouting or Components
I separates the components as per request:
1. Layout for global, this is calls Navbar
2. Login page, it has selector to change between login or register
3. Cart it has page to display some components, it's show current order and order history
4. Notification, every item that show on home will able to add to cart, it will show notif if success add
5. Navbar, you can track cart item changes and access login logout

### Flows
1. User is able to access home, but when logged on the `add to cart` button will show
1.  |
1.  v
1. User able to login / register from /auth page
1.  |
1.  v
1. After login, the token will stored on localStorage
1.  |
1.  v
1. Successful login will move you to homepage screen
1.  |
1.  v
1. You able to add to cart -> show notification
1.  |
1.  v
1. Access cart page -> load history data -> show on history if exist
1.  |
1.  v
1. Ongoing cart if filled, user can finalize to make the order is sent the database on backend
1.  |
1.  v
1. Replace data history

---
#### Disclaimer:
I unable to deploy, since the backend is unable get hosted too...
