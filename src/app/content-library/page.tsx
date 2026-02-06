'use client';

import { useState, useMemo } from 'react';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
  tab: 'social' | 'content' | 'skool';
}

/* ──────────────────────────────────────────────
   POST DATA — SOCIAL POSTS (from content1)
   45 posts: External (Wins 10, Strategy 10, Mindset 10, Tips 10) + Internal (5)
   ────────────────────────────────────────────── */
const socialPosts: Post[] = [
  // ─── EXTERNAL WINS (10) ───
  {
    id: 1, tab: 'social', category: 'Wins',
    title: 'From Orchestra Handcuffs to Six Figures Online: My Story',
    body: `Three years ago, I was a working trombonist trapped in the gig economy rat race.

Today, I make six figures online and live in Japan.

Here's what changed:

The Breaking Point:
I was playing 6-7 gigs per week just to pay rent. Great musicians. Terrible lifestyle.

I realized: My calendar was full, but my bank account wasn't.

The Shift:
I started documenting my practice sessions and performances. Nothing fancy. Just me playing.

The first video got 100 views. The second got 400. The third got 12,000.

The Breakthrough:
One video went viral. Then another. Then another.

Within 18 months:
- 1 billion+ views across platforms
- 1 million+ followers
- $100K+ annual income from content alone

The Best Part:
I still play the trombone. I didn't compromise my artistry. I just learned to share it strategically.

What Changed:
- From trading time for money → Building systems that work while I sleep
- From local gigs only → Performing with The Temptations and orchestras worldwide
- From unknown → Featured on NBC News

The Lesson:
Your skills are valuable. Your online presence is zero.

That gap is costing you opportunities, income, and freedom.

If a trombonist can do this, so can you.`
  },
  {
    id: 2, tab: 'social', category: 'Wins',
    title: 'How I Helped a Viola Professor Gain 30K Followers Without Compromising His Art',
    body: `Wilhelm was a UT Austin viola professor with world-class skills and zero online presence.

Today: 30K followers, 2,500 email subscribers, festival invitations from around the world.

The Situation:
Wilhelm had visa issues that prevented monetization. But he needed visibility to grow his career.

What We Did:
We focused on authority over virality. Strategy over gimmicks. Artistry over memes.

The Content Strategy:
1. High-quality performance clips (showcasing mastery)
2. Teaching moments (establishing expertise)
3. Behind-the-scenes practice (building connection)

No clickbait. No compromise. Just exceptional musicianship shared strategically.

The Results (6 months):
- 30,000+ followers
- 2,500 email subscribers
- Invited to perform at festivals
- Recognized by famous violinists and viola players
- Getting podcast invitations
- Growing authority in his field

The Best Part:
His peers respect him MORE for his online presence, not less.

The Breakthrough Video:
His first YouTube long-form became his best-performing video on his channel.

Why? Because we optimized for his audience, not the algorithm.

The Lesson:
You don't need millions of views to unlock career-changing opportunities.

You need the RIGHT people to see your work.

30K engaged followers > 1M random followers.

Wilhelm's career is now international. All from documenting what he was already doing.

If you're a serious artist worried about "diminishing your art" online... Wilhelm proves you don't have to.`
  },
  {
    id: 3, tab: 'social', category: 'Wins',
    title: 'From First Video to $3K Coaching Program in 60 Days',
    body: `Victor was an orchestra musician tired of the politics and pay.

His first educational video got 30K views.

60 days later: launched a coaching program that made $3K immediately.

The Timeline:

Day 1: Posted first YouTube video
Topic: Advanced technique breakdown for his instrument
Length: 12 minutes
Production: Simple. Just him teaching.

Day 7: Video hit 5K views
He panicked. "Is this good? Should I make more?"

Day 30: Video crossed 30K views
Comments flooded in: "Can you teach me?" "Do you offer lessons?" "I need help with this."

Day 45: Created coaching offer
$500 for 6-week program
No fancy sales page. Just a Google Form.

Day 60: First 6 clients signed up
Total revenue: $3,000

Month 3: Now earning more from coaching than his orchestra job.

The Transformation:
Before: Trading time for money in a toxic orchestra environment
After: Building a coaching business while doing what he loves

The Insight:
One video opened the door. But it wasn't about going viral.

It was about demonstrating expertise to the RIGHT audience.

30K views in his niche = perfect for launching an offer.

The Lesson:
You don't need a million followers to make money.

You need one video that reaches your ideal client.

Victor's video attracted serious students. Students who paid.

That's the difference between vanity metrics and business metrics.

What skill could you teach in a 12-minute video this week?`
  },
  {
    id: 4, tab: 'social', category: 'Wins',
    title: '500K Views Led to Sold-Out Art Exhibitions and Local News Feature',
    body: `Steve creates sound sculptures. Incredible work. Zero online presence.

One viral reel changed everything.

The Story:
Steve built a sound sculpture—intricate, beautiful, completely unknown outside his local circle.

I helped him create ONE reel about it.

Not a product pitch. A story.

The Hook: "I turned a tree into a record player so it could play music at its own funeral."

The video told the story of the sculpture: what it was, why he built it, how it worked.

The Result: 500,000 views in 72 hours.

What Happened Next:
- Featured on local news
- 5 exhibition shows SOLD OUT
- Galleries reaching out asking to host him

The Business Impact:
Steve now uses this success in cold outreach to other exhibitors:

"My recent installation was featured on [News Station] after going viral with 500K views. I'd love to discuss exhibiting with you."

Doors are opening.

The Lesson:
Artists think: "I need consistent virality to build a career."

Reality: ONE viral moment can create opportunities for years.

Steve's 500K-view reel is now:
- His portfolio centerpiece
- Social proof for galleries
- Leverage in negotiations
- A case study for future work

One video. Endless ripple effects.

The Strategy:
We didn't chase the algorithm. We told a story worth sharing.

That's the difference between content that gets views and content that changes your career.

What's the story behind your best work?`
  },
  {
    id: 5, tab: 'social', category: 'Wins',
    title: '5 Million Views = 50K New Followers + Apple Brand Deal',
    body: `Big Wy's Brass Band had talent but no traction.

One collaboration video got 5 million views.

Everything changed.

The Setup:
They were a local brass band with incredible energy. Great live shows. Tiny online following.

We created a cover of "Kilby Girl"—trending song, brass arrangement, high energy performance.

The Result: 5 million views.

The Breakdown:
- Instagram: +10K followers
- TikTok: +40K followers
- Spotify: Sudden demand (playlist adds, saves)

The Unexpected Win:
Apple Bees reached out for a brand deal.

Why? Their social media manager said: "We see you guys all the time online."

The Business Lesson:
Consistent visibility > One-time virality.

But one viral hit opens the door to consistent visibility.

The Strategy Behind the Video:
1. Trending audio (borrowed momentum)
2. Unique angle (brass band, not typical cover)
3. High-energy performance (watchable)
4. Strategic posting time

The Aftermath:
They're now getting:
- More gig requests
- Better-paying gigs
- Brand deal opportunities
- Playlist placements

All from documenting what they were already great at.

The Lesson:
You don't need to change what you do.

You need to share it strategically.

Big Wy's Brass Band didn't become influencers. They became visible musicians with opportunities.

That's the goal.`
  },
  {
    id: 6, tab: 'social', category: 'Wins',
    title: 'Growing a Classical Music Festival to 10K Followers Using Archive Footage',
    body: `Norfolk Chamber Music Festival had decades of performances sitting in a Google Drive.

Zero online presence.

I helped them reach 10K followers using content they already owned.

The Situation:
They had:
- Years of recorded performances
- World-class musicians
- Rare compositions
- Beautiful venue shots

But no one was seeing it.

The Strategy:
We didn't create new content. We repurposed what existed.

The Process:
1. Pulled best performances from archive
2. Cut into 30-60 second clips
3. Optimized for YouTube Shorts
4. Posted consistently for 6 months

The Focus:
- Lesser-known composers (niche appeal)
- Exceptional performances (quality signal)
- Educational context (building authority)

The Results:
- 10,000+ YouTube subscribers
- Brought attention to underappreciated composers
- Increased brand recognition
- Festival attendance grew

The ROI:
Zero production cost. Just strategic editing of existing assets.

The Insight:
Most organizations sit on YEARS of valuable content.

They just don't know how to repurpose it for today's platforms.

The Lesson:
You don't need to create more. You need to share what you have strategically.

If a classical music festival can grow to 10K using archive footage, you can grow using content you've already created.

What's sitting in your archive right now?`
  },
  {
    id: 7, tab: 'social', category: 'Wins',
    title: '1 Million Views Using Simple Educational Content',
    body: `Third Coast Trombone Retreat had world-class educators and zero visibility.

We used simple authority content to gain 1 million+ views.

The Approach:
No viral stunts. No trending audio. Just expertise shared clearly.

The Content Strategy:
- Technique breakdowns
- Practice tips
- Performance insights
- Educational Q&A

All shot on phones. All under 60 seconds. All pure value.

The Results (90 days):
- 1 million+ views across platforms
- 9K Instagram followers
- 9K Facebook followers
- Massive visibility increase

The Business Impact:
More retreat applications. Better-qualified attendees. Increased legitimacy.

The Lesson:
Educational content doesn't need production value.

It needs clarity and expertise.

If you're an expert in your field, your knowledge IS the content.

The people who need what you offer will find you when you share what you know.

Simple. Effective. Scalable.`
  },
  {
    id: 8, tab: 'social', category: 'Wins',
    title: 'Made Millions of Views on an Ad Campaign for... a Pencil Holder',
    body: `Brass Witch makes brass pencil holders.

Overpriced. Niche product. Needed visibility.

I created ads that went viral. Millions of views. The product became a household name.

The Strategy:
We didn't sell the product. We sold the story.

The Ad Concept:
- Showcased the craftsmanship
- Highlighted the absurdity (it's a pencil holder, after all)
- Made it aspirational

The Result: Millions of views. Sold out inventory.

The Lesson:
Great content can sell anything.

Even a $200 pencil holder.

It's not about the product. It's about the story you tell around it.`
  },
  {
    id: 9, tab: 'social', category: 'Wins',
    title: 'Made Over $40K from a Single 60-Second YouTube Video',
    body: `One video. 60 seconds. $40,000 in revenue.

Here's the breakdown:

The Video:
A high-energy trombone performance. Edited tight. Posted at the right time.

The Results:
- 2.4 million views in 30 days
- AdSense revenue: $8,400
- Sponsorship deal from views: $12,000
- Affiliate sales from description: $4,200
- Course sales from traffic: $15,400

Total: $40,000 from one piece of content.

The Math:
60 seconds to perform
30 minutes to edit
10 minutes to post and optimize

$40,000 ÷ 40 minutes of work = $60,000/hour

That's the power of leveraged content.

The Lesson:
One great video can generate income for months.

It's not about volume. It's about creating high-leverage assets.

The Strategy:
I didn't try to go viral. I created content my audience wanted, optimized it properly, and monetized every angle.

That's the formula.`
  },
  {
    id: 10, tab: 'social', category: 'Wins',
    title: 'From Unknown Musician to Performing with The Temptations',
    body: `Social media visibility led to real-world opportunities I never imagined.

The Invitations:
- The Temptations
- The O'Jays
- Four Tops
- Miami Symphony Orchestra (solo performance)
- Canadian Orchestra

None of these happened because of my resume.

They happened because decision-makers saw me online.

The Pattern:
1. Post high-quality performance content
2. Build visibility in my niche
3. Get noticed by industry professionals
4. Receive invitations to perform

The Lesson:
Your online presence isn't separate from your "real" career.

It IS your career.

Orchestras and bands Google you before booking. If they find nothing, you're invisible.

If they find a strong presence, you're credible.

The Reality:
I'm not more talented than 10,000 other trombonists.

But I'm more visible than 9,999 of them.

That's why I get the calls.

Visibility = Opportunity.`
  },

  // ─── EXTERNAL STRATEGY (10) ───
  {
    id: 11, tab: 'social', category: 'Strategy',
    title: 'The Authority Content Strategy That Works for Artists',
    body: `Most artists think they need to go viral to succeed online.

Wrong.

You need to build authority.

Here's the strategy:

The Three-Pillar System:

Pillar 1: Mastery Content (40%)
Show your skill at the highest level.

Examples:
- Performance clips
- Technique demonstrations
- Advanced concepts

Goal: Establish credibility. "This person is a master."

Pillar 2: Teaching Content (40%)
Break down your expertise for others.

Examples:
- How-to tutorials
- Practice tips
- Mistake corrections

Goal: Provide value. "This person helps me improve."

Pillar 3: Personality Content (20%)
Show who you are behind the craft.

Examples:
- Behind-the-scenes moments
- Practice struggles
- Personal insights

Goal: Build connection. "This person is relatable."

The Breakdown:
If you post 10 times per month:
- 4 mastery posts
- 4 teaching posts
- 2 personality posts

Why This Works:
- Mastery attracts respect
- Teaching builds trust
- Personality creates fans

Combined: You're seen as a credible expert who people actually like.

The Implementation:
Plan your next 10 posts using this framework.

Track engagement. Adjust ratios based on what resonates.

But keep all three pillars present.

The Lesson:
Authority isn't built through one viral video.

It's built through consistent demonstration of expertise + value + personality.

Slow and steady wins the race.`
  },
  {
    id: 12, tab: 'social', category: 'Strategy',
    title: 'How to Repurpose One Performance Into 10+ Pieces of Content',
    body: `You don't need 100 performances to create 100 posts.

You need 10 performances and a repurposing system.

The Content Multiplication Framework:

From ONE Performance Recording (5 minutes):

Content Piece 1: Full Performance (YouTube long-form)
Content Piece 2: Best 60 Seconds (YouTube Shorts)
Content Piece 3: Best 30 Seconds (Instagram Reel)
Content Piece 4: Best 15 Seconds (TikTok)
Content Piece 5: Technique Breakdown (Educational)
Content Piece 6: Practice Insight (Teaching)
Content Piece 7: Behind-the-Scenes (Story)
Content Piece 8: Quote Graphic (Inspirational)
Content Piece 9: Email Newsletter Feature
Content Piece 10: Carousel Post (LinkedIn)

The Math:
1 performance = 10+ pieces of content
10 performances = 100+ pieces of content

That's 3+ months of daily posting from 10 recordings.

The Lesson:
Creation is hard. Repurposing is easy.

Master repurposing and you'll never run out of content.

Try this with your last performance this week.`
  },
  {
    id: 13, tab: 'social', category: 'Strategy',
    title: "The 'Archive Mining' Strategy for Instant Content Library",
    body: `You have years of performances sitting on hard drives.

That's not a backlog. That's a gold mine.

The Archive Mining System:

Step 1: Audit Your Archive
Go through:
- Old performance recordings
- Practice session videos
- Rehearsal clips
- Workshop recordings
- Student recordings

Step 2: Grade Each Recording
A-Tier: Exceptional performances (use for mastery content)
B-Tier: Good teaching moments (use for educational content)
C-Tier: Interesting but flawed (use for behind-the-scenes/personality)

Step 3: Create a Content Calendar
Pull best moments from archive and schedule them out.

Step 4: Add Context
Archive content + new commentary = fresh post.

"This was from a performance 2 years ago. Here's what I'd do differently today..."

The Results:
Norfolk Chamber Music Festival did this. 10K followers from archive content alone.

Zero new production. Just strategic repurposing.

The Lesson:
Stop thinking you need to create everything from scratch.

You've already created it. Just share it.

Go through your archive this weekend. You have months of content sitting there.`
  },
  {
    id: 14, tab: 'social', category: 'Strategy',
    title: "Why You Should Prioritize 'Slow Growth' Over Viral Content",
    body: `Everyone wants to go viral.

I help artists build sustainable careers instead.

Here's why slow growth beats viral growth:

The Viral Problem:

You get 1 million views on a video.

Great! Except:
- 990,000 of those viewers don't care about your niche
- They followed for the viral moment, not your art
- They'll never buy from you
- They'll never show up to performances
- They'll unfollow when your content returns to normal

Result: Vanity metrics. No business impact.

The Slow Growth Strategy:

You get 500 views per video consistently.

But:
- 400 of those viewers care deeply about your niche
- They're your ideal audience
- They'll buy your course
- They'll attend your shows
- They'll stay engaged long-term

Result: Real audience. Real business.

The Math:
Viral creator: 500K followers, 2% engaged = 10K real fans
Slow growth creator: 30K followers, 60% engaged = 18K real fans

Slow growth wins.

The Lesson:
Would you rather have 1 million followers who don't care or 10,000 followers who would pay to see you perform?

Build slowly. Build right.`
  },
  {
    id: 15, tab: 'social', category: 'Strategy',
    title: 'The Content Format That Works Best for Musicians',
    body: `After helping 50+ musicians grow online, I've identified the winning format.

The Split-Screen Performance + Commentary Format:

Left Side: You performing
Right Side: You explaining what you're doing

Why It Works:

1. Captures Attention (Performance is engaging)
2. Provides Value (Commentary teaches)
3. Shows Mastery (You can do it and explain it)
4. Builds Authority (Expert demonstration)

The Structure:

0-3 seconds: Hook
"This technique took me 5 years to master."

3-30 seconds: Performance + Commentary
Show the technique while explaining key points.

30-60 seconds: Application
"Here's how you can practice this today."

The Results:
This format consistently outperforms pure performance videos and pure talking head videos.

It combines both. That's why it works.

The Lesson:
Don't just show your skill. Teach it.

Don't just teach. Demonstrate.

The combination is what builds authority and audience.

Try this format on your next 5 posts. Track the difference.`
  },
  {
    id: 16, tab: 'social', category: 'Strategy',
    title: 'How to Get Performance Opportunities from Social Media',
    body: `Social media isn't just for views. It's for real-world opportunities.

Here's how to turn followers into gigs:

The Opportunity Funnel:

Level 1: Visibility
Post consistently to stay top-of-mind.

Level 2: Credibility
Show mastery-level performances.

Level 3: Accessibility
Make it easy for them to contact you.
Bio should include: Email, booking info, or "DM for inquiries"

Level 4: Social Proof
Share past performances, testimonials, press mentions.

The Real Examples:

Wilhelm: Invited to festivals because organizers saw his content
Big Wy's Brass Band: Booked for events because "we see you all the time online"
Me: Invited to perform with The Temptations because they found me online

The Conversion:
I get 5-10 performance inquiries per month from social media alone.

No agent. No cold outreach. Just consistent visibility.

The Lesson:
Your content isn't entertainment. It's your resume.

Treat it that way.`
  },
  {
    id: 17, tab: 'social', category: 'Strategy',
    title: 'The Email List Strategy for Musicians (That Actually Works)',
    body: `Social media is rented land. Email is owned land.

Here's how to build your list as a musician:

The Lead Magnet:

Don't offer a generic "newsletter signup."

Offer something specific and valuable:

Examples:
- "7-Day Practice Challenge" (daily emails with exercises)
- "My Warm-Up Routine" (PDF download)
- "Performance Preparation Checklist" (downloadable resource)
- "10 Technique Fixes" (mini-course)

The Email Sequence:

Email 1 (Immediate): Deliver the lead magnet
Email 2 (Day 1): Share your story
Email 3 (Day 3): Provide additional value
Email 4 (Day 5): Soft pitch (course, coaching, concert tickets)
Email 5+ (Weekly): Value-driven newsletter

The Conversion:
Wilhelm built 2,500 email subscribers in 6 months.

Those subscribers:
- Attend his performances
- Buy his courses
- Share his content
- Provide feedback

The Lesson:
Build your email list from day one.

Social media gets you discovered. Email builds your business.

Start collecting emails this week.`
  },
  {
    id: 18, tab: 'social', category: 'Strategy',
    title: "The 'Documentary Approach' to Content Creation",
    body: `You're already doing the work. Just document it.

The Documentary Mindset:

Most artists think: "I need to create content."

Shift to: "I'm documenting my process."

The Difference:
Creating content = additional work
Documenting process = capturing what already exists

The Implementation:

Before practice: Hit record on your phone
During rehearsal: Capture a moment
After performance: Film a quick reflection

You're not creating extra. You're documenting what's already happening.

The Content Types:

Morning: "Here's my practice plan for today"
During: "This is what I'm working on right now"
After: "Here's what I learned from today's session"

The Results:
You now have 3 pieces of content from one practice session.

Zero extra work. Just documentation.

The Lesson:
Stop thinking of content as separate from your work.

Content IS your work, documented.

Try this for 7 days. Document everything. Post the best moments.

You'll never run out of content again.`
  },
  {
    id: 19, tab: 'social', category: 'Strategy',
    title: 'How to Use Trends Without Compromising Your Art',
    body: `"Should I use trending audio even though I'm a classical musician?"

Yes. Here's how to do it without looking ridiculous:

The Trend Adaptation Framework:

Step 1: Find the Trend
Trending audio, format, or concept on TikTok/Reels.

Step 2: Ask: "How does this apply to my niche?"
Don't copy the trend verbatim. Adapt it.

Examples:

Trending Audio: Upbeat Pop Song
Classical Application: Play the melody on your instrument, then transition to your original arrangement.

Trending Format: "Get Ready With Me"
Musician Application: "Get Ready With Me (For a Performance)" - show your pre-show routine.

Trending Concept: "Things I Wish I Knew"
Musician Application: "Things I Wish I Knew Before Conservatory"

The Balance:
80% Authority Content (timeless)
20% Trend Content (timely)

Trends bring new eyes. Authority keeps them.

The Lesson:
Trends are tools, not mandates.

Use them strategically to amplify your art, not replace it.`
  },
  {
    id: 20, tab: 'social', category: 'Strategy',
    title: "The Cold Outreach Strategy for Artists (Using Social Proof)",
    body: `Steve sold out 5 exhibitions using this exact cold outreach strategy.

The Framework:

Subject Line: "[Your Art Form] Exhibition Inquiry"

Body:
"Hi [Name],

I'm [Your Name], a [your discipline] artist based in [location].

My recent [project] was featured on [News/Publication] after garnering [X views/engagement] online. [Include link]

I'm reaching out to inquire about potential exhibition opportunities at [Their Venue].

[1-2 sentence pitch of your work]

I've attached my portfolio for your review. Would you be open to a brief call to discuss?

Best,
[Your Name]"

The Key Elements:

1. Social Proof (featured on news, X views)
2. Specific Project (not vague inquiry)
3. Portfolio Link (makes decision easy)
4. Brief (no long artist statement)

The Lesson:
Social media visibility makes cold outreach warm.

You're not unknown anymore. You have proof.

Build visibility first. Leverage it second.`
  },

  // ─── EXTERNAL MINDSET (10) ───
  {
    id: 21, tab: 'social', category: 'Mindset',
    title: "Social Media Won't Diminish Your Art (If You Do It Right)",
    body: `The biggest fear I hear from artists:

"I don't want to be seen as an influencer. I'm a serious artist."

I get it. But here's the truth:

The False Choice:

You think it's:
Serious Artist OR Content Creator

Reality:
Serious Artist WHO Shares Their Work

The Difference:
Influencers create content to get attention.
Artists share their work to reach the right people.

One is performance. The other is documentation.

The Mindset Shift:

Stop thinking: "Social media cheapens my art"
Start thinking: "Social media amplifies my art"

Your craft is still your craft. Social media is just the megaphone.

The Lesson:
Beethoven would have posted his symphonies on YouTube.

Da Vinci would have shared his sketches on Instagram.

Sharing your art doesn't diminish it. Hiding it does.

You worked too hard to stay invisible.`
  },
  {
    id: 22, tab: 'social', category: 'Mindset',
    title: 'Done is Better Than Perfect (Especially for Artists)',
    body: `Artists are trained to be perfect.

That training is killing your online growth.

The Perfectionism Trap:

You record a video.
You watch it 10 times.
You notice small mistakes.
You don't post it.

Repeat for months.

Result: Zero online presence.

The Reality:
Your "imperfect" video is better than most people's best work.

Your standards are too high for social media.

The Shift:

Recording Studio: Perfection required
Social Media: Authenticity wins

They're different mediums with different standards.

The Permission:
Your social media content doesn't need to be Carnegie Hall-ready.

It needs to be good enough to demonstrate expertise.

That's it.

The Practice:
Next video: Record it once. Edit it once. Post it.

Don't watch it 10 times. Don't overanalyze.

Ship it and move on.

The Lesson:
Perfectionism protects your ego. It also keeps you invisible.

Choose progress over perfection.

Done is better than perfect. Every single time.`
  },
  {
    id: 23, tab: 'social', category: 'Mindset',
    title: "You Don't Need Millions of Views to Build a Career",
    body: `The viral myth is killing artist careers.

Here's the truth:

The Misconception:
"I need to go viral to make money online."

The Reality:
Viral views don't pay bills. The right audience does.

The Numbers:

Scenario A: 1 million random views
- 990K don't care about your niche
- 10K might follow
- 100 might buy

Scenario B: 10K targeted views
- 8K care about your niche
- 2K might follow
- 200 might buy

Scenario B generates 2x more customers from 100x fewer views.

The Lesson:
You don't need to be famous. You need to be known by the right 1,000 people.

Focus on quality audience over quantity of views.

Your career will grow faster.`
  },
  {
    id: 24, tab: 'social', category: 'Mindset',
    title: "Escaping the 'Orchestra Handcuffs'",
    body: `Orchestra jobs feel like security.

They're actually golden handcuffs.

The Reality:

You have:
- Stable paycheck
- Prestigious position
- Union benefits

But you don't have:
- Income ceiling
- Schedule freedom
- Creative control

You're trading potential for stability.

The Shift:
I was in the same position. Playing 6-7 gigs per week. Exhausted. Capped.

Building online changed everything:
- $100K+ income (no ceiling)
- Work from anywhere (moved to Japan)
- Control my schedule
- Choose my projects

I didn't quit music. I quit the handcuffs.

The Path:
You don't have to quit tomorrow.

Start building your online presence while you have stability.

6-12 months of consistent content = options you don't have now.

The Lesson:
Social media gives you leverage to create Plan B while you're still in Plan A.

Start building now. Thank yourself later.`
  },
  {
    id: 25, tab: 'social', category: 'Mindset',
    title: "The 'Gig Economy Rat Race' Ends When You Build Leverage",
    body: `Freelance musicians are trapped in time-for-money trades.

Here's how to escape:

The Problem:

Gig 1: 2 hours = $200
Gig 2: 3 hours = $300
Gig 3: 1 hour = $150

Total: 6 hours = $650

But what happens when you can't gig?

Sick? $0. Injured? $0. Vacation? $0.

No gigs = no income.

The Leverage Solution:

Create content once. Earn repeatedly.

Video 1: Create in 1 hour → Earns $500 over 12 months
Course 1: Create in 10 hours → Sells 50 times at $100 = $5,000
Email sequence: Write once → Converts subscribers into customers forever

The Shift:
Stop trading time for money.
Start trading time for assets.

Assets work while you sleep.

The Lesson:
Gigs are income. Content is equity.

Build equity. Escape the rat race.`
  },
  {
    id: 26, tab: 'social', category: 'Mindset',
    title: 'Stop Waiting for Permission to Share Your Art',
    body: `Artists wait for validation before posting.

Meanwhile, their careers stall.

The Permission Mindset:

"I'll post when I'm good enough."
"I'll post when I have better equipment."
"I'll post when I feel confident."

Result: You never post.

The Truth:
You're already good enough. You perform professionally.

You don't need more skill. You need more courage.

The Shift:
You don't need validation to post. You need to post to get validation.

Every artist I've helped started by posting "before they were ready."

Wilhelm felt insecure about his first video. Posted anyway. 30K followers.
Victor was nervous about teaching online. Posted anyway. $3K coaching program.

They didn't wait for permission. They gave themselves permission.

The Lesson:
Nobody will tap you on the shoulder and say "You're ready."

You decide you're ready. Then you post.

Today is the day you give yourself permission.`
  },
  {
    id: 27, tab: 'social', category: 'Mindset',
    title: "Your Peers' Judgment Matters Less Than You Think",
    body: `"I don't want to be the weird guy who films everything."

This fear stops 90% of artists from posting.

The Reality Check:

Your peers' opinions don't pay your bills.
Your peers' judgment doesn't get you gigs.
Your peers' approval doesn't grow your career.

The Irony:
The same peers who judge you for posting are also:
- Struggling to get gigs
- Stuck in the same situation
- Jealous of your ambition

Why are you taking career advice from people with careers you don't want?

The Shift:
Your peers aren't your audience.

Your audience is:
- Students who want to learn from you
- Event organizers looking for performers
- Fans who appreciate your art

None of them think you're "weird" for posting. They're grateful you do.

The Lesson:
The people who judge you for building online are the same people who will ask you how you did it when you succeed.

Ignore the critics. Focus on building.`
  },
  {
    id: 28, tab: 'social', category: 'Mindset',
    title: 'The Long Game: 90 Days of Consistency Changes Everything',
    body: `Most artists quit posting after 3 weeks.

The breakthrough happens at day 90.

The Timeline:

Days 1-30: Building the Habit
- You're figuring out what to post
- Engagement is low
- Growth is slow
- This is normal

Days 31-60: Finding Your Voice
- You're getting comfortable on camera
- Content quality improves
- Patterns emerge
- Small wins appear

Days 61-90: Momentum Builds
- Algorithm starts recognizing you
- Followers accumulate
- Engagement increases
- Opportunities appear

Day 90+: Exponential Growth
- Consistency pays off
- Audience is engaged
- Revenue opportunities unlock
- Career transforms

The Commitment:
You cannot judge results at day 30.

The artists who succeed commit to 90 days minimum.

The Lesson:
90 days of imperfect consistency > 10 days of perfect execution.

Commit to 90 days. See it through.

Your breakthrough is closer than you think.`
  },
  {
    id: 29, tab: 'social', category: 'Mindset',
    title: 'Why Most Artist Content Fails (And How to Fix It)',
    body: `Artists post for 30 days and quit.

"Nobody cares about my content."

Here's why it's not working:

Mistake 1: Posting Performance Only
"Here's me playing."
Nobody knows why they should care. No context. No story. No hook.
Fix: Add context. "This is the hardest passage in the piece. Here's why."

Mistake 2: Inconsistent Posting
Week 1: 7 posts. Week 2: 2 posts. Week 3: 0 posts.
Fix: Post 3x per week minimum. Consistency beats intensity.

Mistake 3: No Call to Action
You post great content. Then nothing.
Fix: Tell them what to do next. "Follow for more." "Link in bio."

Mistake 4: Ignoring Trends
Fix: Adapt trends to your niche. Use trending audio with your instrument.

Mistake 5: Perfectionism
Record 10 times. Edit for 3 hours. Never post.
Fix: Good enough is better than perfect.

The Lesson:
Great artists with bad strategy get no views.

Good artists with great strategy build careers.

Strategy matters more than talent.`
  },
  {
    id: 30, tab: 'social', category: 'Mindset',
    title: "You're Not 'Selling Out' by Building Online",
    body: `"I'm not trying to be an influencer. I'm a real artist."

I hear this constantly. It's a limiting belief.

The Truth:
Building an online presence doesn't make you an influencer.

It makes you visible.

The Third Option:

Visible Artist:
- Uses social media strategically
- Maintains artistic integrity
- Reaches the right people
- Gets paid for their craft

The Comparison:

Invisible Artist:
- Symphony job only
- Limited opportunities
- Trading time for money
- Unknown outside local scene

Visible Artist:
- Symphony job + content income
- Opportunities from around the world
- Leverage through systems
- Known in their industry

Same skill. Different results. The difference is visibility.

The Lesson:
You're not selling out. You're showing up.

Stop hiding behind "I'm a real artist."

Real artists share their work. That's what we do.`
  },

  // ─── EXTERNAL TIPS (10) ───
  {
    id: 31, tab: 'social', category: 'Tips',
    title: 'The Best Phone Settings for Recording Performance Videos',
    body: `You don't need a $5,000 camera.

You need the right phone settings.

The Setup:

Resolution: 4K (if your phone supports it)
Frame Rate: 24fps or 30fps (24 = cinematic, 30 = smooth)
Lighting: Natural light from window OR ring light
Audio: Use external mic or get close to phone

The Composition:

Rule of Thirds: Place yourself off-center
Background: Clean and simple
Eye Level: Camera at your eye level or slightly above

The Quick Settings:
iPhone: Settings → Camera → Record Video → 4K at 30fps

The Editing:
CapCut (free) handles everything you need:
- Trim
- Speed adjustments
- Color correction
- Subtitles

The Lesson:
Perfect lighting + good audio > expensive camera with bad lighting

Master your phone first. Upgrade equipment later.`
  },
  {
    id: 32, tab: 'social', category: 'Tips',
    title: 'How to Hook Viewers in the First 3 Seconds',
    body: `You have 3 seconds to stop the scroll.

Here's how:

Formula 1: Big Statement
"This is the hardest technique in classical music."

Formula 2: Challenge Belief
"You've been practicing scales wrong your entire life."

Formula 3: Curiosity Gap
"This $500 piece of gear changed my tone completely."

Formula 4: Demonstration
Immediately show impressive skill with no intro.

Formula 5: Question
"Can you tell the difference between a $1,000 and $10,000 instrument?"

The Anti-Hook (Don't Do This):
"Hey guys! Welcome back to my channel. Today I'm going to talk about..."

Nobody cares. They scroll.

The Lesson:
Your intro determines everything.

Skip the "Hey guys" and get to the point immediately.

You have 3 seconds. Make them count.`
  },
  {
    id: 33, tab: 'social', category: 'Tips',
    title: 'The Simple Caption Formula That Drives Engagement',
    body: `Long captions don't get read. Short captions don't convert.

Here's the formula that works:

Line 1: Hook (stop the scroll)
"I spent 3 years mastering this."

Line 2-4: Story/Context (build connection)
"When I started, I could barely play it. My teacher said it was too advanced."

Line 5-6: Lesson/Insight (provide value)
"The key was breaking it into 4-bar sections and perfecting each one."

Line 7: Call to Action (drive engagement)
"What technique are you working on right now? Drop it below."

Total Length: 7 lines, ~100-150 words

The Psychology:
- Hook stops scroll
- Story creates relatability
- Lesson provides value
- CTA drives comments (which boosts algorithm)

The Lesson:
Captions aren't just descriptions. They're engagement tools.

Use them strategically.`
  },
  {
    id: 34, tab: 'social', category: 'Tips',
    title: 'Best Times to Post for Musicians',
    body: `After analyzing 1,000+ posts from musicians, here are the optimal posting times:

Morning: 7-9am EST
- People checking phones before work
- Best for: Educational content

Lunch: 12-2pm
- Quick scroll during break
- Best for: Short performance clips

Evening: 6-8pm
- Peak engagement time
- Best for: Full performances

Late Evening: 9-10pm
- Wind-down scrolling
- Best for: Inspirational or reflective content

The Strategy:
Pick 2 time slots that work for your schedule.

Post consistently at those times for 30 days.

Track which one performs better. Double down.

The Lesson:
Consistency > perfect timing.

But if you're posting anyway, optimize for peak windows.`
  },
  {
    id: 35, tab: 'social', category: 'Tips',
    title: 'How to Get Your First 100 Email Subscribers',
    body: `Email list = owned audience. Here's how to start:

The Lead Magnet Options:

Option 1: "7-Day Tone Improvement Challenge"
Option 2: "My 20-Minute Daily Warm-Up Routine" (PDF)
Option 3: "3 Techniques That Transformed My Playing" (Video series)
Option 4: Free Arrangement of a Popular Song

The Setup (30 minutes):
1. Create lead magnet (PDF or video)
2. Sign up for ConvertKit (free under 1,000 subscribers)
3. Create opt-in landing page
4. Add link to bio

The Promotion:
Post 1: "I just created a free resource. Link in bio."
Post 2: Show someone using the resource
Post 3: Share a testimonial/result
Post 4: FAQ about the resource

Post about it 2x per week until you hit 100.

The Lesson:
Start building your list TODAY.

100 email subscribers > 10,000 followers with no list.`
  },
  {
    id: 36, tab: 'social', category: 'Tips',
    title: 'The Fastest Way to Improve Your Video Editing',
    body: `Most musicians overthink editing.

Here's what actually matters:

The Essential Edits (90% of quality):

Edit 1: Tight Cuts
Cut out pauses, breaths, mistakes. Keep only the best moments.
Tool: CapCut's "Silence Remove" feature

Edit 2: Captions
Add text overlay for accessibility and retention.
Why: 80% watch with sound off.
Tool: CapCut's Auto Captions (free)

Edit 3: Color Grade
Slightly boost contrast and saturation.
Tool: CapCut's built-in filters

Edit 4: Audio Levels
Normalize audio so it's consistent.

That's it. 4 edits. 10 minutes max.

The Stuff You DON'T Need:
- Fancy transitions
- Multiple camera angles
- Complex effects
- Animated intros

The 80/20:
80% of video quality comes from good lighting, clear audio, tight editing.

20% comes from fancy effects.

Focus on the 80%.

The Lesson:
Simple editing done well > complex editing done poorly.

Edit your next video in under 15 minutes using these 4 steps.`
  },
  {
    id: 37, tab: 'social', category: 'Tips',
    title: 'How to Respond to Comments (And Why It Matters)',
    body: `Replying to comments isn't just polite. It's strategic.

The Algorithm Boost:
Every reply you leave = another comment.
More comments = higher engagement = algorithm boost.

The Strategy:

Genuine Question:
Them: "What mouthpiece do you use?"
You: "I use a Bach 6½AL. What are you currently using?"

Compliment:
Them: "Amazing playing!"
You: "Thank you! I've been working on this piece for 3 months. What's your favorite part?"

Constructive Criticism:
Them: "Your intonation was off at 1:24"
You: "Good catch! I noticed that too. What do you think caused it?"

The Timing:
Reply within the first 2 hours of posting.

Early engagement signals to algorithm that this post is "hot."

The ROI:
Videos where I reply to every comment: 2.4x more reach

The Lesson:
Comments aren't noise. They're fuel for the algorithm.

Reply to every comment on your next 5 posts. Watch your engagement explode.`
  },
  {
    id: 38, tab: 'social', category: 'Tips',
    title: "The 'Batch Recording' System for Musicians",
    body: `Recording daily content is exhausting.

Batch recording solves this.

The System:

Step 1: Block 2 Hours Once Per Week
Sunday afternoon works for most people.

Step 2: Record 10-15 Short Clips
- 5 performance clips
- 5 teaching moments
- 5 behind-the-scenes
Each clip: 30-90 seconds raw footage.

Step 3: Edit in One Session (60 minutes)
Use CapCut. Batch edit all clips at once.

Step 4: Schedule Posts for the Week
Use Instagram/Facebook's built-in scheduler.

The Math:
3 hours of work = 15 pieces of content = 5 posts per week for 3 weeks.

Batch recording: 3 hours per week vs daily recording: 7+ hours per week.

The Lesson:
Consistency doesn't mean daily recording.

It means daily posting.

Batch record, schedule ahead, post consistently.`
  },
  {
    id: 39, tab: 'social', category: 'Tips',
    title: 'How to Use Hashtags (Without Looking Desperate)',
    body: `Hashtags still work. But most musicians use them wrong.

The 3-Tier System:

Tier 1: Niche Tags (5 tags)
Small, specific to your instrument/genre.
Examples: #trombonist #classicalmusician #orchestraplayer

Tier 2: Mid-Level Tags (3 tags)
Broader music categories.
Examples: #musicianlife #practicemakesperfect #musicteacher

Tier 3: General Tags (2 tags)
Broad, high-traffic.
Examples: #music #musician

Total: 10 hashtags per post

The Placement:
First comment, not in caption. Cleaner aesthetic.

The Research:
Look at top posts in your niche. Copy tags with 50K-500K posts.

Avoid:
- Tags over 10M posts (too competitive)
- Tags under 5K posts (too small)

The Lesson:
Strategic hashtags = discoverability.

Random hashtags = wasted potential.`
  },
  {
    id: 40, tab: 'social', category: 'Tips',
    title: "The 'Content Remix' System for Maximizing One Performance",
    body: `One performance recording can become 20+ pieces of content.

Here's the exact system:

From One 5-Minute Performance:

Content 1-3: Platform-Specific Edits (YouTube Shorts, Reels, TikTok)
Content 4-6: Technique Breakdowns (3 teaching moments)
Content 7-9: Practice Insights (story behind difficult sections)
Content 10: Behind-the-Scenes
Content 11: Comparison Post (practice vs performance)
Content 12-15: Quote Graphics
Content 16: Email Newsletter Feature
Content 17: LinkedIn Thought Piece
Content 18-20: Instagram Carousel (educational slides)

The Output:
1 recording → 20 pieces of content → 4 weeks of posting

The Lesson:
You're not creating enough content because you're not remixing.

Stop recording new stuff. Maximize what you have.

Pick your last great performance. Remix it into 20 posts this week.`
  },

  // ─── INTERNAL POSTS (5) ───
  {
    id: 41, tab: 'social', category: 'Internal',
    title: "Member Spotlight: First Viral Video!",
    body: `Let's celebrate!

After 47 days of consistent posting in the Conservatory, a member just had their first video cross 100K views.

The Strategy They Used:
- Split-screen performance + commentary format
- Trending audio adapted to their instrument
- Posted at optimal time (7am EST)
- Replied to every comment in first 2 hours

The Results:
- 127K views in 48 hours
- 847 new followers
- 23 DM inquiries about their services

The Lesson:
This is what happens when you apply what you learn here.

Consistency + Strategy = Results

Who's next? Drop your commitment to 90 days in the comments.`
  },
  {
    id: 42, tab: 'social', category: 'Internal',
    title: "This Week's Content Challenge: The Split-Screen Format",
    body: `This week's challenge for the Conservatory:

Create ONE video using the split-screen performance + commentary format.

The Assignment:
- Left side: You performing a technique or passage
- Right side: You explaining what you're doing
- 30-60 seconds total

How to Do It:
1. Record performance video (vertical)
2. Record talking head explanation (vertical)
3. Use CapCut split-screen template
4. Add captions
5. Post

The Deadline:
Post by Friday. Tag the Conservatory in your caption.

Share your video in the #CreationsShowcase channel for feedback.

Best execution this week gets featured in next week's community call + full breakdown.

Let's see those split-screens by Friday!`
  },
  {
    id: 43, tab: 'social', category: 'Internal',
    title: 'Monthly Mindset Check-In: Where Are You in the 90-Day Journey?',
    body: `It's mindset check-in time.

Where are you in your 90-day journey?

Days 1-30: Building the Habit
If you're here: Focus on showing up. Quality comes later. Just post.

Days 31-60: Finding Your Voice
If you're here: You're past the hardest part. Keep going. Refine your format.

Days 61-90: Momentum Building
If you're here: You're seeing results now. Don't stop. This is where it compounds.

Day 90+: Exponential Growth
If you're here: You're winning. Share your process to help others.

The Reality Check:
Most people quit between days 30-45.

You're in a room full of people who didn't quit.

That already makes you top 10%.

What's your biggest challenge right now?

Drop it below. Let's problem-solve together.`
  },
  {
    id: 44, tab: 'social', category: 'Internal',
    title: 'Quick Win: Use This Caption Template for Your Next Post',
    body: `Free caption template for Conservatory members:

Copy and paste this structure. Fill in your details.

---

Line 1: [State a transformation or challenge]
Example: "I spent 3 years struggling with this technique."

Line 2-4: [Share the journey]
Example: "My teacher said it was too advanced. I practiced 2 hours daily anyway."

Line 5-6: [Share the insight]
Example: "The breakthrough came when I focused on a specific approach."

Line 7: [Call to Action]
Example: "What technique are you working on? Drop it below."

---

Why This Works:
- Hook (transformation)
- Story (connection)
- Lesson (value)
- CTA (engagement)

Use this template on your next post.

Track: Did you get more comments than usual?

Copy. Paste. Customize. Post. That simple.`
  },
  {
    id: 45, tab: 'social', category: 'Internal',
    title: 'Community Win: We Just Hit 100 Members!',
    body: `100 members in the Conservatory!

When I started this community, I wanted to create a space where serious artists could learn to grow online without compromising their craft.

You all showed up. You engaged. You posted. You supported each other.

The Impact So Far:
- 17 members hit their first 10K followers
- 8 members launched digital products
- 23 members posted consistently for 90+ days
- 5 members landed performance opportunities from social media

What's Next:
- New AI tools dropping next week
- Monthly guest expert sessions
- Advanced content breakdowns
- 1-on-1 portfolio reviews (for Artist Elite members)

Every win you share inspires someone else to keep going.

Here's to the next 100 members. And the next 1,000.

Let's keep going.`
  },
];

/* ──────────────────────────────────────────────
   POST DATA — CONTENT & VIEWS (from content2)
   50 posts customized for Tim Maines / Creator Conservatory
   ────────────────────────────────────────────── */
const contentPosts: Post[] = [
  // ─── HOOKS (10) ───
  {
    id: 101, tab: 'content', category: 'Hooks',
    title: 'The first 3 seconds are life or death',
    body: `If your hook doesn't stop the scroll:
• Perfect editing = wasted
• Great value = invisible
• Amazing CTA = irrelevant

My hook formula:
Pattern interrupt + Curiosity gap + Clear promise

Example: "I went from playing gigs for $200 to making $40K from a 60-second trombone video. Here's how."

What's your go-to hook pattern?`
  },
  {
    id: 102, tab: 'content', category: 'Hooks',
    title: 'Thumbnail psychology 101',
    body: `People don't click what they understand.

They click what confuses them just enough.

My thumbnail rules:
• 1 face, exaggerated emotion
• 3 words max, massive text
• Bright background, high contrast
• Something feels slightly OFF

My best-performing thumbnail was me mid-performance with the trombone slide fully extended and the text "IMPOSSIBLE?" — confusion + curiosity = clicks.

What's your best-performing thumbnail element?`
  },
  {
    id: 103, tab: 'content', category: 'Hooks',
    title: 'The algorithm rewards watch time, not views',
    body: `100K views with 20% retention = dead.
500 views with 80% retention = rocket fuel.

I learned this when my trombone cover got 2.4M views because average view duration was 45 seconds on a 60-second video. Meanwhile, a video with 200K views and 15% retention went nowhere.

Now I optimize for:
• Opening loops every 15 seconds
• Editing pace that matches energy
• Payoffs that exceed promises

How do you maximize retention?`
  },
  {
    id: 104, tab: 'content', category: 'Hooks',
    title: 'Your editing pace is probably too slow',
    body: `Compare your videos to top creators.

Count the cuts per minute.

Yours: Probably 3-4 cuts per minute.
Top performers: 8-12 cuts per minute.

I aim for 6-8 cuts per minute on performance content and 10+ on talking head educational videos.

Speed = energy.
Energy = retention.
Retention = views.

What's your editing pace strategy?`
  },
  {
    id: 105, tab: 'content', category: 'Hooks',
    title: 'The title formula that never fails',
    body: `[Number] + [Outcome people want] + [Timeframe/method]

Examples:
• "7 Practice Tricks That Triple Your Progress (No Extra Hours)"
• "I Posted 100 Music Videos in 30 Days. Here's What Happened"
• "This 10-Second Trombone Technique Got Me 5M Views"

Notice the pattern?

Number creates specificity. Outcome creates desire. Timeframe creates urgency.

What's your title formula?`
  },
  {
    id: 106, tab: 'content', category: 'Hooks',
    title: 'B-roll is 50% of the video, not a decoration',
    body: `Most creators:
• Film talking head
• Add random B-roll
• Call it done

Pros:
• Script the B-roll first
• Every shot advances story
• B-roll carries half the message

My B-roll rule: If I can mute the video and still understand it, I did it right. When I film performance content, I plan the close-ups of slide positions, finger movements, and audience reactions before I even hit record.

How do you approach B-roll?`
  },
  {
    id: 107, tab: 'content', category: 'Hooks',
    title: "The platform doesn't care about your best work",
    body: `Your favorite video: 500 views.
The random one you rushed: 50K views.

Why?

Because the algorithm optimizes for:
• Click-through rate
• Average view duration
• Engagement velocity

Not quality. Not effort. Not creativity.

My most-viewed video of all time was a casual trombone jam I almost didn't post. Meanwhile, the video I spent 6 hours editing got crickets.

Your best work ≠ what performs.

Ever feel this frustration?`
  },
  {
    id: 108, tab: 'content', category: 'Hooks',
    title: 'Music selection is half the emotion',
    body: `Same video, different music = different performance.

I tested this: Same trombone performance clip — one with cinematic orchestral music underneath, another with lo-fi beats. The orchestral version got 3x more saves and 2x more shares.

Now I choose music based on:
• Energy matching pacing
• Genre matching audience
• Emotional arc matching story

Music isn't background. It's narrative.

How do you choose your background music?`
  },
  {
    id: 109, tab: 'content', category: 'Hooks',
    title: 'The posting time myth everyone falls for',
    body: `"Post at 3pm on Tuesday" is BS.

What actually matters:
• When YOUR audience is active (check analytics)
• Consistency over optimization
• First-hour engagement velocity

I post at 7 AM EST because that's when my audience of musicians and artists are checking phones before practice or their day jobs.

Stop trying to game the algorithm.
Start serving your actual audience.

What's your posting strategy?`
  },
  {
    id: 110, tab: 'content', category: 'Hooks',
    title: 'Viral content has a pattern structure',
    body: `Every viral video follows this:

1. Hook (0-3 sec): Stop the scroll
2. Promise (4-10 sec): What they'll learn
3. Story (11-60 sec): How you discovered it
4. Payoff (61-90 sec): Deliver the value
5. CTA (91-100 sec): What to do next

Deviate from this = lower performance.

This is the exact structure I used on the video that made me $40K. Hook with the result, promise the breakdown, tell the story, deliver the goods, ask them to follow.

Do you follow a structure or wing it?`
  },

  // ─── WINS (10) ───
  {
    id: 111, tab: 'content', category: 'Wins',
    title: 'First video that hit 1M views',
    body: `Posted a trombone cover of a trending song.

Expected: Maybe 10K.

Got: 1.2M views in 48 hours.

What I learned:
• I was overthinking hooks
• Simplicity beats cleverness
• The algorithm rewards speed (I posted within 2 hours of filming)

Your first viral hit?

What did it teach you?`
  },
  {
    id: 112, tab: 'content', category: 'Wins',
    title: 'Someone made a reaction video to my content',
    body: `Woke up to:

A music reaction channel with 500K subscribers reacted to my trombone video.

My channel grew by 2,000 subs overnight.

Lesson: Create content WORTH reacting to.

Hot takes, bold claims, unique angles.

Give people something to respond to.

Ever been featured in someone else's content?`
  },
  {
    id: 113, tab: 'content', category: 'Wins',
    title: 'I figured out my content niche by accident',
    body: `I thought I was a jazz trombone creator.

Posted one random video of a street performance mashup.

It exploded.

Turns out my real niche is: an artist empowerment educator who happens to play trombone. People didn't just want to watch me play — they wanted to learn how I built a career from it.

Sometimes the audience tells you who you are.

Listen to what performs, not what you planned.

Ever pivot by accident?`
  },
  {
    id: 114, tab: 'content', category: 'Wins',
    title: 'Crossed 1M followers organically',
    body: `No ads.
No shoutouts.
No collabs.

Just:
• Posting 3-5x per week for 18 months
• Testing hooks obsessively
• Optimizing based on analytics

The algorithm rewards consistency + quality.

Not luck. Not timing. Not tricks.

What milestone are you chasing?`
  },
  {
    id: 115, tab: 'content', category: 'Wins',
    title: "A brand reached out for a sponsorship I didn't pitch",
    body: `Never cold-emailed them.

They found me through my viral trombone videos on Instagram.

Offered: $5,000 for a 60-second branded performance video.

Proof that content is the best sales funnel.

Your content is your resume.

Ever land a deal without pitching?`
  },
  {
    id: 116, tab: 'content', category: 'Wins',
    title: 'My editing time dropped from 8 hours to 2 hours',
    body: `Used to edit frame-by-frame.

Now I:
• Use templates for intros/outros
• Batch similar cuts
• Automate color grading
• Accept 80% quality over 100% perfection

More videos > perfect videos.

Speed is a competitive advantage.

What's your editing workflow evolution?`
  },
  {
    id: 117, tab: 'content', category: 'Wins',
    title: 'Built a 30-day content buffer',
    body: `Used to post same-day.

Always stressed.

Now I:
• Film 1 day per week (batch 4-5 videos)
• Edit in 2-hour blocks
• Schedule everything 30 days out

Result:
• Zero stress
• Better quality
• Can focus on strategy, not scrambling

How far ahead do you plan?`
  },
  {
    id: 118, tab: 'content', category: 'Wins',
    title: "Someone copied my exact format and I'm not mad",
    body: `Saw a video that's:
• Same structure
• Same hook style
• Same editing pace

Thought: Should I be mad?

Then realized: I copied someone too.

Imitation = validation.

You're doing something right if people copy you.

Ever been copied?`
  },
  {
    id: 119, tab: 'content', category: 'Wins',
    title: 'My worst-performing video taught me the most',
    body: `Posted a trombone technique breakdown.

Got 200 views.

Felt like a failure.

But analytics showed:
• Hook had 15% CTR (terrible)
• Retention dropped at 0:08 (I was too slow getting to the point)
• Thumbnail was too busy

Failures are data.

Use them.

What's your biggest lesson from a flop?`
  },
  {
    id: 120, tab: 'content', category: 'Wins',
    title: 'I stopped caring about comments and grew faster',
    body: `Used to reply to every comment.

It drained me.

Now I:
• Reply to top 10 only
• Focus on making better videos
• Let the community talk to each other

Result: More time to create.

Better content = more growth than comment engagement.

How do you balance community and creation?`
  },

  // ─── STRATEGY (10) ───
  {
    id: 121, tab: 'content', category: 'Strategy',
    title: "The algorithm doesn't owe you anything",
    body: `You can:
• Make great content
• Post consistently
• Optimize everything

And still not go viral.

Because:
• Timing matters
• Luck matters
• The algorithm serves the viewer, not the creator

Your job: Make so much content that luck has to find you eventually. I posted for 6 months before my first video broke 100K. Then three went viral in one week.

How do you deal with randomness?`
  },
  {
    id: 122, tab: 'content', category: 'Strategy',
    title: "I'm optimizing for the wrong metric",
    body: `I used to chase:
• Views
• Subscribers
• Engagement

But what I actually need:
• Audience loyalty
• Email list growth
• Product sales

Views are vanity.
Revenue is sanity.

When I shifted from chasing views to building my Creator Conservatory community, my income doubled even though my views stayed flat.

What metric should you actually care about?`
  },
  {
    id: 123, tab: 'content', category: 'Strategy',
    title: 'My content is derivative and I know it',
    body: `I watch top creators.

I copy their:
• Hooks
• Structures
• Thumbnails

Am I innovating?

No.

Am I growing?

Yes.

Original ≠ successful.

Successful = pattern recognition + slight variation.

The key is adding YOUR unique angle. I take proven formats and filter them through the lens of an artist who's actually done it — not a marketer guessing.

Do you copy or create?`
  },
  {
    id: 124, tab: 'content', category: 'Strategy',
    title: 'Short-form is eating my long-form attention span',
    body: `I used to make 10-minute videos.

Now I struggle to watch my own 60-second shorts.

The algorithm trained me to:
• Need instant gratification
• Skip slow intros
• Crave dopamine hits

I'm becoming the audience I'm trying to serve.

The antidote: I force myself to create one long-form YouTube video per month. It keeps my storytelling muscles sharp and builds deeper connection with my audience.

Is this sustainable?`
  },
  {
    id: 125, tab: 'content', category: 'Strategy',
    title: "I don't know if I'm a creator or a content machine",
    body: `I used to create because I loved it.

Now I create because:
• The algorithm demands it
• My audience expects it
• My income depends on it

Did I turn my passion into a prison?

Or is this just what professional creation looks like?

The honest answer: Building the Creator Conservatory gave me purpose beyond the content hamster wheel. Teaching other artists how to build online brought the joy back. Find your "why" beyond views.`
  },
  {
    id: 126, tab: 'content', category: 'Strategy',
    title: 'Trends make me anxious, not excited',
    body: `New trend drops.

Everyone jumps on it.

I think:
• "I'm too slow"
• "I'll miss the wave"
• "Everyone's doing it better"

FOMO is real.

But chasing trends = always behind.

My approach now: I pick ONE trend per week max and adapt it to my niche. A brass arrangement of a trending song, a "day in the life" of a touring musician. The rest of my content is evergreen authority pieces.

How do you handle trend anxiety?`
  },
  {
    id: 127, tab: 'content', category: 'Strategy',
    title: "I judge other creators but I'm doing the same thing",
    body: `I see someone:
• Clickbait thumbnail
• Recycled content
• Obvious hook formula

I think: "So unoriginal."

Then I look at my channel.

I'm doing the exact same thing.

Judgment is projection.

We're all playing the same game. The difference is whether you're honest about it. At least in the Creator Conservatory we can be real about the mechanics behind the magic.`
  },
  {
    id: 128, tab: 'content', category: 'Strategy',
    title: 'The more I grow, the less I enjoy creating',
    body: `At 1K subs: Pure fun.

At 10K subs: Pressure to perform.

At 100K subs: Feels like a job.

At 1M followers: It IS a job.

Success brought:
• Expectations
• Comparison
• Burnout

What saved me: Building the Creator Conservatory community. Teaching other artists reminded me why I started. Seeing their wins reignites my own fire.

Did I ruin the thing I loved by monetizing it? No. I just needed to evolve my relationship with it.`
  },
  {
    id: 129, tab: 'content', category: 'Strategy',
    title: "I don't know who my audience actually is",
    body: `I thought my audience was: conservatory-trained musicians looking for gig tips.

Analytics say they're: self-taught artists and creators in their 20s-30s who want to build an online presence without feeling like sellouts.

Age, gender, location, interests = all different than I assumed.

I was making content for an imaginary audience. When I adjusted to serve who was actually watching, everything changed.

How well do you actually know your viewers?`
  },
  {
    id: 130, tab: 'content', category: 'Strategy',
    title: 'Consistency is killing my creativity',
    body: `Posting schedule: 3-5x per week.

Quality: Declining.

Creativity: Exhausted.

The algorithm rewards consistency.

But I'm running out of ideas.

My solution: I batch-record on Mondays (the "machine" work), then give myself Wednesdays for experimental content — weird ideas, collaborations, stuff that might flop. That experimental day keeps me sane and occasionally produces my best work.

What's your consistency vs. creativity balance?`
  },

  // ─── TACTICS (10) ───
  {
    id: 131, tab: 'content', category: 'Tactics',
    title: 'Do you script word-for-word or bullet points?',
    body: `I see creators:

Some: Full script, teleprompter, verbatim.

Others: Bullet points, improvise, natural.

I do bullet points for performance commentary and full scripts for educational breakdowns. Bullet points keep the energy natural. Scripts keep the information tight.

Because: Performance content needs spontaneity. Educational content needs precision.

What's your scripting method?`
  },
  {
    id: 132, tab: 'content', category: 'Tactics',
    title: 'How many times do you watch your video before posting?',
    body: `Do you:
• Watch it 10+ times and obsess?
• Watch it once and ship it?
• Never watch it (trust the edit)?

I watch it twice: once for content accuracy, once for pacing. Then I ship it. Over-analyzing kills momentum.

I used to watch my trombone videos 15 times and re-record because of tiny intonation issues nobody else would notice. That perfectionism cost me months of growth.

What's your balance?`
  },
  {
    id: 133, tab: 'content', category: 'Tactics',
    title: 'Do you read comments or does it mess with your head?',
    body: `Comments can be:
• Helpful feedback
• Toxic noise
• Distracting validation

I skim the top comments and respond to thoughtful ones. I avoid reading everything — especially on viral videos where random trolls show up.

Because: My mental health matters more than engagement metrics. And honestly, the best feedback comes from my Creator Conservatory members, not random commenters.

How do you handle comments?`
  },
  {
    id: 134, tab: 'content', category: 'Tactics',
    title: 'What\'s your camera setup: Phone or real gear?',
    body: `Phone: $0, fast, mobile.

Real camera: $$$, quality, complexity.

I use: iPhone 15 Pro for 90% of content. Sony A7III for studio sessions and long-form YouTube.

And honestly: The phone content usually outperforms the camera content because I'm more natural and shoot faster.

Gear doesn't matter as much as you think. Content > quality. Every time.

What's your gear philosophy?`
  },
  {
    id: 135, tab: 'content', category: 'Tactics',
    title: 'How long does it take you to make one video?',
    body: `From idea to upload:

Idea: 5 minutes (usually comes during practice)
Script/outline: 10 minutes
Film: 15 minutes
Edit: 30-45 minutes
Publish (caption, hashtags, scheduling): 10 minutes

Total: About 70-90 minutes per video.

It used to take me 4-5 hours. Speed comes from repetition and letting go of perfectionism.

Am I slow or is everyone else lying about their speed?`
  },
  {
    id: 136, tab: 'content', category: 'Tactics',
    title: 'Do you delete low-performing videos?',
    body: `That video with 300 views.

Do you:
• Delete it (clean up channel)?
• Keep it (proof of journey)?
• Private it (hide but keep)?

I keep everything. Because sometimes the algorithm picks up old videos months later. I had a video go from 400 views to 200K eight months after posting. You never know.

Plus, your early content is proof of your growth. New followers love seeing the journey.

What's your strategy?`
  },
  {
    id: 137, tab: 'content', category: 'Tactics',
    title: 'How much of your content is planned vs. spontaneous?',
    body: `Planned: 70%
Spontaneous: 30%

I plan my educational breakdowns and strategy content. I freestyle my performance clips and behind-the-scenes.

The planned content performs more consistently. The spontaneous content occasionally goes viral.

You need both. The planned stuff builds your brand. The spontaneous stuff keeps it human.

What performs better for you?`
  },
  {
    id: 138, tab: 'content', category: 'Tactics',
    title: 'Do you respond to DMs or let them pile up?',
    body: `DMs sitting in my inbox right now: 847.

Do you:
• Reply to all?
• Reply to select ones?
• Ignore most?

I reply to select ones — specifically people who ask genuine questions about growing as an artist. If someone's clearly just saying "nice video" I heart-react and move on.

I also funnel DM conversations into Creator Conservatory where I can help at scale instead of one-by-one.

How do you scale personal interaction?`
  },
  {
    id: 139, tab: 'content', category: 'Tactics',
    title: 'Do you use AI for scripts, thumbnails, or ideas?',
    body: `ChatGPT, Midjourney, etc.

I use AI for: Brainstorming content angles, writing first drafts of captions, generating thumbnail text ideas, and repurposing long-form content into short-form scripts.

I don't use AI for: Actual performance content (obviously), final caption voice, or anything that needs to sound like ME. AI is a starting point, not the finished product.

Because: My audience follows me for my personality and expertise, not for AI-generated content. AI speeds up the grunt work so I can focus on what matters.

What's your AI boundary?`
  },
  {
    id: 140, tab: 'content', category: 'Tactics',
    title: 'What percentage of your ideas actually get made?',
    body: `Ideas in my notes: 200+

Videos published: About 40 per month across platforms.

Execution rate: Maybe 20%

I have massive idea overload. The solution: I rate ideas 1-5 on "will my audience care?" and only make the 4s and 5s. Everything else goes into an archive for later.

In the Creator Conservatory, I teach members this exact system. Most artists have the opposite problem — they think they have no ideas. They have plenty. They just haven't organized them.

What's your idea-to-video ratio?`
  },

  // ─── STORIES (10) ───
  {
    id: 141, tab: 'content', category: 'Stories',
    title: 'I filmed 20 takes and used the first one',
    body: `Spent 3 hours filming a trombone technique video.

Take 1: Felt rushed.
Take 20: Felt forced.

Went back and watched Take 1.

It was the best.

Lesson: First instinct is usually right.

Over-optimization kills authenticity. The energy in Take 1 was real. By Take 20, I was performing for the camera instead of just being myself.

Ever overthink yourself into worse results?`
  },
  {
    id: 142, tab: 'content', category: 'Stories',
    title: 'A viral video killed my channel for 2 months',
    body: `Posted a comedy trombone skit.

Got 5M views.

Subscribers flooded in.

But:
• They expected comedy content
• I make educational + performance content
• They left
• Algorithm tanked my other videos

Viral ≠ sustainable.

Caution: Going viral for the wrong content ruins your channel. It took me 2 months to recover my average view duration because the algorithm kept pushing my videos to the wrong audience.

Ever regret a viral hit?`
  },
  {
    id: 143, tab: 'content', category: 'Stories',
    title: 'I accused someone of stealing my content and I was wrong',
    body: `Saw a video:
• Same topic
• Similar hook
• Similar edit

I DMed them: "You copied me."

They replied: "I posted mine first."

Checked timestamps.

They were right.

I apologized.

Lesson: Ideas aren't owned. Execution is. Two people can independently have the same idea. In a niche as specific as musician content strategy, overlap is inevitable.

Ever jump to conclusions?`
  },
  {
    id: 144, tab: 'content', category: 'Stories',
    title: "My most viral video wasn't even my idea",
    body: `A comment on one of my videos said:

"You should do a trombone cover of that trending anime opening."

I thought it was random and probably wouldn't work.

Made it anyway.

2M views.

Lesson: You're too close to your content.

Outsiders see what you can't. This is exactly why I built the Creator Conservatory — having a community that gives you feedback and ideas is invaluable.

Listen to feedback.

Ever resist an idea that worked?`
  },
  {
    id: 145, tab: 'content', category: 'Stories',
    title: 'I burned out and took 3 months off',
    body: `Posted 4-5x per week for 18 months straight.

Hit a wall.

Couldn't create. Couldn't pick up the trombone without feeling dread.

Took 3 months off in Japan. Just lived. Practiced for fun. No cameras.

Lost some subscribers.

Came back refreshed.

Grew faster than before.

Lesson: Burnout kills channels and careers.

Breaks save them. Your audience will wait for authentic you. They won't wait for burned-out you.

Ever take a real break?`
  },
  {
    id: 146, tab: 'content', category: 'Stories',
    title: 'A brand deal turned into a nightmare',
    body: `Brand offered $8,000 for a branded trombone performance video.

Sounded easy.

Then:
• 47 revision requests
• Approval took 6 weeks
• Final video performed terribly because it felt forced
• My audience could smell the inauthenticity

Lesson: Not all money is good money.

Protect your audience trust over short-term cash. Now I only take brand deals where I have creative control. If they want a script, I pass.

Ever regret a sponsorship?`
  },
  {
    id: 147, tab: 'content', category: 'Stories',
    title: "I got shadowbanned and it wasn't the algorithm's fault",
    body: `Views tanked overnight.

Blamed the algorithm.

Turns out:
• I used copyrighted music in a background track
• Didn't realize it
• Video got flagged
• Channel got soft-banned for 2 weeks

Lesson: Always check music licenses.

This is especially critical for musicians — you'd think we'd know better. Even covers need proper licensing on some platforms. I now use original recordings or verified royalty-free tracks exclusively.

Ever get caught by copyright?`
  },
  {
    id: 148, tab: 'content', category: 'Stories',
    title: 'I hired an editor and it ruined my content',
    body: `Thought: I'll outsource editing and focus on filming.

Result:
• Editor didn't understand my pacing
• Videos felt generic and overproduced
• Performance dropped 40%
• Fired them after 5 videos

Lesson: Editing IS your voice.

You can outsource tasks, not tone. Your cuts, your rhythm, your style — that's part of your brand. I eventually found an editor who watched 50 of my videos before touching a single clip. That's the standard.

Ever outsource too soon?`
  },
  {
    id: 149, tab: 'content', category: 'Stories',
    title: 'My camera died mid-shoot and I used my phone',
    body: `Filming a trombone lesson for YouTube.

Camera battery: Dead. No backup.

Switched to iPhone.

Posted it anyway.

Result: Best-performing video that month.

The comments said: "This feels more real." "I love the raw quality."

Lesson: Gear doesn't matter as much as you think.

Content > quality. Your audience wants to connect with YOU, not your camera specs.

Ever have an equipment disaster turn into a win?`
  },
  {
    id: 150, tab: 'content', category: 'Stories',
    title: 'A comment changed my entire content strategy',
    body: `Someone commented:

"Your intros are too long. I always skip to 0:30."

I checked analytics.

60% of viewers did the same.

Cut all my intros from 30 seconds to 3 seconds.

Retention jumped 25%.

One honest comment was worth more than 1,000 likes. I now start every video mid-action or mid-sentence. No "hey guys, welcome back." Just value from second one.

This single change is one of the first things I teach in the Creator Conservatory.

Ever get brutal feedback that helped?`
  },
];

/* ──────────────────────────────────────────────
   POST DATA — SKOOL (from content-skool)
   100 posts — Skool community engagement posts
   ────────────────────────────────────────────── */
const skoolPosts: Post[] = [
  // ============================================================
  // CONNECTION (10 posts, IDs 201-210)
  // ============================================================
  {
    id: 201,
    tab: 'skool' as const,
    category: 'Connection',
    title: `What's your Skool origin story?`,
    body: `I'm curious — how did you end up on Skool?\n\nDid someone refer you? Did you stumble across it randomly? Were you running a community somewhere else and made the switch?\n\nDrop your origin story below. I bet there are some wild ones in here.\n\nBonus: tag the person who brought you in (if you remember).`,
  },
  {
    id: 202,
    tab: 'skool' as const,
    category: 'Connection',
    title: `Tag someone who's been helpful in this community`,
    body: `Let's give some love today.\n\nTag a member who's helped you — answered a question, gave feedback, or just made you feel welcome.\n\nIt takes 10 seconds to tag someone. It might make their whole week.\n\nI'll start: [tag a member and say why].`,
  },
  {
    id: 203,
    tab: 'skool' as const,
    category: 'Connection',
    title: `Show your workspace RIGHT NOW — no cleaning up`,
    body: `No staging. No tidying. No excuses.\n\nDrop a photo of your workspace exactly as it looks right now.\n\nI want to see the coffee cups, the sticky notes, the chaos. Or the minimalist desk with nothing on it. Both are valid.\n\nHere's mine: [attach photo]\n\nYour turn.`,
  },
  {
    id: 204,
    tab: 'skool' as const,
    category: 'Connection',
    title: `Rate your Skool addiction: 1-10`,
    body: `Be honest.\n\n1 = I check in once a week maybe\n5 = I'm in here daily, it's part of my routine\n10 = I dream about leaderboard points and wake up checking notifications\n\nI'm at a solid [your number]. No shame.\n\nWhat about you? And what keeps pulling you back in?`,
  },
  {
    id: 205,
    tab: 'skool' as const,
    category: 'Connection',
    title: `What's one thing you wish someone told you before joining Skool?`,
    body: `Every platform has a learning curve.\n\nMaybe it was about how the algorithm works. Maybe it was about community culture. Maybe it was something about the gamification that surprised you.\n\nWhat do you wish you knew on day one?\n\nLet's build a cheat sheet for new members right here in the comments.`,
  },
  {
    id: 206,
    tab: 'skool' as const,
    category: 'Connection',
    title: `Where in the world are you posting from today?`,
    body: `I love knowing where everyone is.\n\nDrop your city (or country) below. Let's see how spread out this community really is.\n\nI'm posting from [your city].\n\nWouldn't be surprised if we have members on every continent. Let's find out.`,
  },
  {
    id: 207,
    tab: 'skool' as const,
    category: 'Connection',
    title: `What are you working on this week? (Accountability thread)`,
    body: `Every week I like to check in.\n\nWhat's the ONE thing you're focused on this week?\n\nKeep it specific. Not "grow my business" — more like "write 3 posts for my Skool community" or "finish my course module on [topic]."\n\nDrop it below. We'll check back in on Friday.\n\nMine: [your focus for the week].`,
  },
  {
    id: 208,
    tab: 'skool' as const,
    category: 'Connection',
    title: `If we met for coffee, what would you want to talk about?`,
    body: `Forget the internet for a second.\n\nIf you and I sat down at a coffee shop for 30 minutes — no agenda, no pitch — what would you want to talk about?\n\nBusiness? Life? A random hobby? Something you're struggling with?\n\nI'm genuinely curious. Drop it below and let's have that conversation right here.`,
  },
  {
    id: 209,
    tab: 'skool' as const,
    category: 'Connection',
    title: `What Skool community changed your life? (Besides this one 😉)`,
    body: `There are thousands of Skool communities out there.\n\nSome of them are incredible. Some of them taught you something you still use every day.\n\nWhich Skool community has had the biggest impact on you and why?\n\nNo affiliate links — just genuine recommendations. I'll share mine in the comments too.`,
  },
  {
    id: 210,
    tab: 'skool' as const,
    category: 'Connection',
    title: `What's something about you that would surprise this community?`,
    body: `We all show up here with our "professional" hat on.\n\nBut there's more to all of us than Skool and business.\n\nWhat's something about you that would surprise people here?\n\nMaybe you were a competitive athlete. Maybe you speak 4 languages. Maybe you have a completely random talent.\n\nI'll go first: [your surprising fact].`,
  },

  // ============================================================
  // CELEBRATION (10 posts, IDs 211-220)
  // ============================================================
  {
    id: 211,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `The comment that made me cry (in the best way)`,
    body: `I got a comment from a member yesterday that stopped me in my tracks.\n\nThey said: [share the comment or paraphrase it]\n\nI stared at my screen for a full minute. This is why we do this.\n\nHave you ever gotten a comment or message from a community member that hit you like that? Share it below. I want to feel all the feelings today.`,
  },
  {
    id: 212,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `Celebrating a member's win — this one's special`,
    body: `I have to shout this out.\n\n[Member name] just [describe their win].\n\nThey joined [X weeks/months] ago and have been putting in the work quietly. Today it paid off.\n\nThis is what community is about. Not just content — but people actually executing and getting results.\n\nDrop a congratulations below. They deserve it.`,
  },
  {
    id: 213,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `Things I was completely wrong about when I started on Skool`,
    body: `Let me celebrate being wrong.\n\n1. I thought nobody would pay for a community\n2. I thought I needed thousands of members to make it work\n3. I thought more content = more engagement\n4. I thought gamification was gimmicky\n5. I thought [your wrong assumption]\n\nBeing wrong is underrated. It means you're learning.\n\nWhat were YOU wrong about? Let's make this the longest thread of wrong assumptions ever.`,
  },
  {
    id: 214,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `My worst post became my best post`,
    body: `I almost deleted it.\n\nI wrote a post I thought was too [raw/simple/controversial]. I hit publish and immediately felt that wave of regret.\n\nThen it blew up. Most comments I'd ever gotten. Most engagement. Most DMs.\n\nThe post was about: [topic]\n\nTurns out people don't want polished. They want real.\n\nHas this ever happened to you? Drop your "worst post that did the best" story below.`,
  },
  {
    id: 215,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `We just hit [milestone] members — here's what I've learned`,
    body: `When I started this Skool community, I wasn't sure if anyone would join.\n\nToday we hit [milestone] members. That's [milestone] people who chose to be here.\n\nHere's what I've learned along the way:\n\n1. [Lesson 1]\n2. [Lesson 2]\n3. [Lesson 3]\n\nThank you to every single person in here. You ARE the community. I just opened the door.`,
  },
  {
    id: 216,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `Screenshot dump: Messages that keep me going`,
    body: `On hard days, I open a folder on my phone.\n\nIt's full of screenshots — DMs, comments, testimonials from members.\n\nI'm sharing a few today (with permission) because I think we all need a reminder of why we do this.\n\n[Share 2-3 screenshots or paraphrased messages]\n\nDo you keep a "wins" folder? If not, start one today. You'll thank yourself later.`,
  },
  {
    id: 217,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `One year on Skool — my honest numbers`,
    body: `I'm celebrating one year on Skool today. Here are my real numbers:\n\n- Members: [number]\n- Revenue: [number]\n- Posts published: [number]\n- Hours spent: way more than I expected\n- Times I wanted to quit: [number]\n- Regrets: zero\n\nThis platform changed my business. But more than that — it changed how I think about community.\n\nIf you're early in your Skool journey, keep going. The compound effect is real.`,
  },
  {
    id: 218,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `The smallest win that meant the most`,
    body: `It wasn't the revenue milestone. It wasn't hitting a member count.\n\nThe win that meant the most to me was: [describe a small, meaningful win]\n\nSometimes the biggest celebrations should be for the smallest things.\n\nWhat's a "small" win you've had in your Skool journey that actually meant everything? I want to hear it.`,
  },
  {
    id: 219,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `From lurker to leader — a member transformation story`,
    body: `I want to celebrate someone who transformed right in front of our eyes.\n\nWhen [member] first joined, they didn't post for [weeks/months]. They just watched.\n\nThen one day they dropped a comment. Then a post. Then they started helping others.\n\nNow they're one of the most active and valuable members here.\n\nThis is the magic of Skool communities. People bloom when the environment is right.\n\nWho's a "lurker turned leader" in your community?`,
  },
  {
    id: 220,
    tab: 'skool' as const,
    category: 'Celebration',
    title: `I just got my first Skool payout — here's the truth about it`,
    body: `The amount doesn't matter. What matters is that it happened.\n\nI got paid to run a community. People valued what I built enough to pay for it.\n\nThe actual number: [your number]\n\nIs it life-changing money? [Maybe/not yet]. But it's proof of concept. And that changes everything.\n\nIf you haven't hit your first payout yet — it's coming. Keep building.\n\nWho else remembers their first Skool payout? How did it feel?`,
  },

  // ============================================================
  // REFLECTION (10 posts, IDs 221-230)
  // ============================================================
  {
    id: 221,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The cost nobody talks about when running a Skool community`,
    body: `Everyone talks about the revenue.\n\nNobody talks about the cost.\n\nI don't mean money. I mean:\n\n- The mental bandwidth of being "on" every day\n- The guilt when you don't post for 48 hours\n- The emotional labor of supporting members through hard times\n- The comparison trap when you see other communities growing faster\n\nRunning a Skool community is rewarding. But it costs something. And pretending it doesn't helps nobody.\n\nWhat's the hidden cost you've experienced?`,
  },
  {
    id: 222,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `I think about quitting every Tuesday`,
    body: `I'm being dramatic. But only slightly.\n\nThere's always a day where it hits — the "is this worth it?" feeling.\n\nFor me it's usually [day/time]. When I'm staring at engagement metrics or feeling like I'm talking to myself.\n\nThen someone posts a win. Or sends a DM. Or I see a conversation happening without me. And I remember why I'm here.\n\nDoes anyone else have a "quit day"? Please tell me I'm not alone.`,
  },
  {
    id: 223,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The identity crisis is real`,
    body: `Am I a creator? A community leader? A course instructor? A coach? A moderator?\n\nRunning a Skool community gives you 17 job titles and none of them feel quite right.\n\nSome days I feel like a teacher. Other days a therapist. Other days a content machine.\n\nI've stopped trying to pick one label. I just show up and serve.\n\nBut I'd be lying if I said the identity confusion doesn't get to me sometimes.\n\nAnyone else wrestling with this?`,
  },
  {
    id: 224,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `Building in public is lonely (and nobody warns you)`,
    body: `Here's the paradox:\n\nYou're surrounded by people in your community. Hundreds, maybe thousands.\n\nAnd yet the actual building — the strategy, the decisions, the 11pm content sessions — that's done alone.\n\nMost of my friends and family don't understand what I do. "So you run a... forum?"\n\nSkool communities like this one are the only place I feel understood.\n\nIs it just me, or does anyone else feel this weird loneliness?`,
  },
  {
    id: 225,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The version of me that started this community wouldn't recognize me now`,
    body: `I've changed more in [timeframe] of running a Skool community than in the [X years] before it.\n\nI'm more patient. More empathetic. Better at communicating.\n\nI'm also more tired, more opinionated, and way better at setting boundaries.\n\nRunning a community is personal development on steroids. You can't hide from yourself when you're showing up for people every day.\n\nHow has running or being part of a Skool community changed you?`,
  },
  {
    id: 226,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `I stopped comparing my Skool to other Skool communities`,
    body: `This was the single best decision I made.\n\nI used to obsess over other communities. Their member count. Their engagement. Their fancy classroom setup.\n\nIt was eating me alive.\n\nThen I realized: the only metric that matters is whether MY members are getting results.\n\nNot likes. Not leaderboard activity. Results.\n\nOnce I focused on that, everything changed.\n\nWhat comparison trap have you fallen into? And how did you get out?`,
  },
  {
    id: 227,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The member who left taught me more than the ones who stayed`,
    body: `They didn't leave quietly. They told me exactly why.\n\n"[Paraphrase their feedback]"\n\nIt stung. But they were right.\n\nI made [specific changes] because of that feedback. The community is better for it.\n\nNow I actively ask members why they cancel. Most community owners avoid this. I think it's the most valuable data you can get.\n\nHave you ever had a departing member teach you something important?`,
  },
  {
    id: 228,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `I'm not sure I'd start on Skool the same way if I did it again`,
    body: `Hindsight is brutal.\n\nIf I were starting my Skool community from scratch, I would:\n\n1. [Thing you'd do differently]\n2. [Thing you'd do differently]\n3. [Thing you'd do differently]\n\nAnd I would NOT:\n\n1. [Thing you'd skip]\n2. [Thing you'd skip]\n\nBut here's the thing — I needed to make those mistakes to learn these lessons.\n\nWhat would you do differently if you started over?`,
  },
  {
    id: 229,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The pressure to always have the answer`,
    body: `When you run a community, people look to you.\n\nThey ask questions. They want direction. They expect you to know.\n\nBut sometimes... I don't know.\n\nAnd I've learned that saying "I don't know, but let's figure it out together" is more powerful than pretending.\n\nThe best communities aren't built on one person having all the answers. They're built on everyone searching together.\n\nDo you feel this pressure too?`,
  },
  {
    id: 230,
    tab: 'skool' as const,
    category: 'Reflection',
    title: `The day I realized my community didn't need me as much as I thought`,
    body: `I disappeared for a week. Life happened.\n\nI expected to come back to a ghost town. Tumbleweeds. Zero engagement.\n\nInstead? Members were helping each other. Conversations were flowing. Someone even organized an impromptu challenge.\n\nIt was humbling. And liberating.\n\nThe best Skool communities aren't dependent on the owner. They develop their own life.\n\nHas your community ever surprised you by thriving without you?`,
  },

  // ============================================================
  // QUESTION (10 posts, IDs 231-240)
  // ============================================================
  {
    id: 231,
    tab: 'skool' as const,
    category: 'Question',
    title: `What's your unpopular Skool opinion?`,
    body: `I'll go first: [your unpopular opinion about Skool]\n\nMaybe you think gamification is overrated. Maybe you think free communities outperform paid ones. Maybe you think the leaderboard creates the wrong incentives.\n\nWhatever it is — drop it below. No judgment. The spicier the better.\n\nLet's have a real conversation, not an echo chamber.`,
  },
  {
    id: 232,
    tab: 'skool' as const,
    category: 'Question',
    title: `If Skool disappeared tomorrow, what would you do?`,
    body: `Serious question.\n\nIf Skool shut down with 30 days notice — what's your plan?\n\nDo you have your members' emails? Could you migrate to another platform? Would your community survive the transition?\n\nThis isn't fear-mongering. It's a useful thought experiment about how resilient your community really is.\n\nWhat would your backup plan look like?`,
  },
  {
    id: 233,
    tab: 'skool' as const,
    category: 'Question',
    title: `How do you handle members who vanish?`,
    body: `They signed up excited. Maybe posted once or twice. Then... gone.\n\nDo you reach out? Send a DM? Let them go?\n\nI've tried different approaches:\n\n- Personal DM after 2 weeks of inactivity\n- A "we miss you" email\n- Nothing (let them come back on their own terms)\n\nWhat's your approach? And what's actually worked?\n\nI feel like this is the #1 unsolved problem in Skool communities.`,
  },
  {
    id: 234,
    tab: 'skool' as const,
    category: 'Question',
    title: `Would you run your Skool community for free?`,
    body: `Hypothetical: money is handled. You don't need income from your community.\n\nWould you still run it?\n\nI think the honest answer reveals a lot about your relationship with your community.\n\nFor me: [your honest answer]\n\nWhat about you? And why?`,
  },
  {
    id: 235,
    tab: 'skool' as const,
    category: 'Question',
    title: `What's the ONE feature Skool is missing?`,
    body: `If you could add one feature to Skool tomorrow, what would it be?\n\nI see people ask for:\n- Better analytics\n- Email sequences\n- Sub-groups\n- Live streaming built in\n- [Your feature request]\n\nBut if you could only pick ONE — what would make the biggest difference for your community?\n\nBonus: explain why it matters more than you think.`,
  },
  {
    id: 236,
    tab: 'skool' as const,
    category: 'Question',
    title: `Free Skool community or paid? What's actually better?`,
    body: `I see this debate constantly and I want to hear YOUR take.\n\nFree community pros: bigger audience, lower barrier, more reach\nPaid community pros: higher commitment, better conversations, actual revenue\n\nI've tried [your experience] and here's what I found: [your insight]\n\nBut I know it depends on your model, niche, and goals.\n\nWhat's working for you? Free, paid, or some hybrid?`,
  },
  {
    id: 237,
    tab: 'skool' as const,
    category: 'Question',
    title: `How many hours per week do you ACTUALLY spend on your Skool community?`,
    body: `Not the number you tell people. The real number.\n\nInclude everything:\n- Creating content\n- Responding to comments\n- DMs\n- Planning\n- Course/classroom updates\n- Staring at analytics\n\nI tracked mine last week and it was [your number] hours. More than I expected.\n\nWhat's your real number? And do you think it's sustainable?`,
  },
  {
    id: 238,
    tab: 'skool' as const,
    category: 'Question',
    title: `What's one thing you'd tell someone about to launch their first Skool community?`,
    body: `One piece of advice. That's all you get.\n\nNot a list. Not a framework. Just the single most important thing.\n\nMine: [your one piece of advice]\n\nLet's build the best "getting started" advice thread on Skool. Future community owners will thank us.\n\nDrop yours below.`,
  },
  {
    id: 239,
    tab: 'skool' as const,
    category: 'Question',
    title: `Do your members actually use the Classroom feature?`,
    body: `Real talk — the Classroom is one of Skool's best features.\n\nBut do your members actually go through the courses? Or do they just hang out in the Community tab?\n\nI've noticed [your observation].\n\nI'm curious about:\n- Completion rates\n- What type of content works best in Classroom\n- How you drive people from Community to Classroom\n\nWhat's your experience?`,
  },
  {
    id: 240,
    tab: 'skool' as const,
    category: 'Question',
    title: `What metric matters most for a Skool community?`,
    body: `Everyone tracks member count. But is that really the metric that matters?\n\nSome options:\n- Active members (posted in last 7 days)\n- Retention rate\n- Revenue per member\n- Comments per post\n- Member-to-member interactions\n- [Your metric]\n\nIf you could only look at ONE number to judge the health of your community, what would it be?\n\nI've changed my answer three times. Curious where you land.`,
  },

  // ============================================================
  // STORY (10 posts, IDs 241-250)
  // ============================================================
  {
    id: 241,
    tab: 'skool' as const,
    category: 'Story',
    title: `The launch that completely flopped`,
    body: `I spent [timeframe] building my Skool community. Recording content. Designing the classroom. Writing the sales page.\n\nLaunch day came. I posted everywhere. Sent every email.\n\nResult: [your embarrassing number] members.\n\nI was devastated. But here's what I learned:\n\n[Key lesson from the flop]\n\nThe community I have now exists BECAUSE of that failure, not in spite of it.\n\nAnyone else have a launch flop story? Let's normalize it.`,
  },
  {
    id: 242,
    tab: 'skool' as const,
    category: 'Story',
    title: `When a member called me out (and they were right)`,
    body: `This was uncomfortable.\n\nA member publicly called me out for [what they called you out on].\n\nMy first reaction was defensive. My ego flared up. I started drafting a response that was basically a justification.\n\nThen I stopped. Read their comment again. And realized they were 100% right.\n\nI responded with: "You're right. I'm going to fix this."\n\nThat interaction built more trust than any piece of content I've ever created.\n\nHow do you handle being called out?`,
  },
  {
    id: 243,
    tab: 'skool' as const,
    category: 'Story',
    title: `The price increase that scared me to death`,
    body: `I knew I was undercharging. Everyone told me. The value was obvious.\n\nBut raising my Skool community price from $[old] to $[new] felt terrifying.\n\nI was convinced everyone would leave. I wrote the announcement email with shaking hands.\n\nWhat actually happened:\n\n- [X]% of members stayed\n- New members joined at the higher price without blinking\n- The people who left were mostly [observation]\n\nRevenue went [up/stayed the same] and the community quality improved.\n\nThe lesson: [your lesson about pricing]`,
  },
  {
    id: 244,
    tab: 'skool' as const,
    category: 'Story',
    title: `I accidentally leaked my revenue and here's what happened`,
    body: `This is embarrassing.\n\nI was sharing my screen during a live call and forgot to close [tab/window]. My Stripe dashboard was visible for a good 30 seconds.\n\nMembers saw everything. Monthly revenue. Transaction history. All of it.\n\nI panicked. Then something unexpected happened:\n\nMembers were SUPPORTIVE. Some were inspired. A few said "wait, that's it?" (ouch, but fair).\n\nIt accidentally became one of the most trust-building moments in my community.\n\nTransparency — even accidental — is powerful.`,
  },
  {
    id: 245,
    tab: 'skool' as const,
    category: 'Story',
    title: `The DM that changed how I run my entire community`,
    body: `A member sent me a DM that was three paragraphs long.\n\nThe gist: "[Paraphrase their message — something about what they needed that you weren't providing]"\n\nI read it three times. They weren't angry — they were honest. And they cared enough to write it out.\n\nI made [specific changes] based on that one message.\n\nEngagement went up [X]% in the following month.\n\nOne DM. One honest member. Everything changed.\n\nHave you ever gotten a message that shifted your entire approach?`,
  },
  {
    id: 246,
    tab: 'skool' as const,
    category: 'Story',
    title: `The time I ran two Skool communities at once (don't do this)`,
    body: `I thought I was being smart. Two niches. Two communities. Double the revenue, right?\n\nWrong.\n\nWithin a month:\n- Quality dropped in both\n- I was burned out\n- Members could feel my divided attention\n- Neither community felt "mine" anymore\n\nI shut one down after [timeframe]. It was one of the hardest and best decisions I've made.\n\nFocus is a superpower. One Skool community, done well, beats two done poorly every time.\n\nAnyone else learned this the hard way?`,
  },
  {
    id: 247,
    tab: 'skool' as const,
    category: 'Story',
    title: `My first member refund request — and what I did`,
    body: `It came in on a Tuesday. Subject line: "Requesting a refund."\n\nMy stomach dropped.\n\nTheir reason: [their reason]\n\nI had two choices: fight it or learn from it.\n\nI chose to [your approach]. Refunded immediately, asked for honest feedback, and made changes.\n\nThat member actually came BACK two months later. They're still here.\n\nHow you handle refunds says everything about how you run your community.\n\nWhat's your refund philosophy?`,
  },
  {
    id: 248,
    tab: 'skool' as const,
    category: 'Story',
    title: `The post I deleted (and why I shouldn't have)`,
    body: `I wrote something vulnerable. Hit publish. Watched it sit with zero engagement for 2 hours.\n\nPanicked. Deleted it.\n\nBiggest mistake. A member DM'd me later: "Hey, I was in the middle of writing a reply to your post and it disappeared. That post was exactly what I needed today."\n\nI felt terrible.\n\nLesson: Give your posts time. Not every piece of content goes viral in 60 minutes. Some of the best ones are slow burns.\n\nHave you ever regretted deleting something?`,
  },
  {
    id: 249,
    tab: 'skool' as const,
    category: 'Story',
    title: `How a random Skool comment turned into a $[X]K opportunity`,
    body: `I left a genuine, thoughtful comment on someone's post in another Skool community.\n\nNot a pitch. Not a plug. Just a helpful comment.\n\nThat person DM'd me. We got on a call. One thing led to another.\n\nResult: a [partnership/client/collaboration] worth $[amount].\n\nAll from one comment.\n\nThe lesson: show up and add value everywhere. You never know who's watching or what doors a single interaction can open.\n\nAnyone else have a "random comment to real opportunity" story?`,
  },
  {
    id: 250,
    tab: 'skool' as const,
    category: 'Story',
    title: `I almost got kicked out of a Skool community (and learned everything)`,
    body: `Before I ran my own community, I was THAT member.\n\nI was self-promoting in comments. Hijacking threads. Treating every post as a networking opportunity.\n\nThe community owner sent me a DM: "Hey — we need to talk about your behavior."\n\nI was mortified. But that conversation taught me:\n\n1. [Lesson about community etiquette]\n2. [Lesson about adding value first]\n3. [Lesson about self-awareness]\n\nI run my own community completely differently because of that moment.\n\nWho else learned community leadership by first being a terrible community member?`,
  },

  // ============================================================
  // GROWTH (10 posts, IDs 251-260)
  // ============================================================
  {
    id: 251,
    tab: 'skool' as const,
    category: 'Growth',
    title: `How I got my first 100 Skool members (and what actually worked)`,
    body: `The first 100 members are the hardest. Here's exactly what I did:\n\n1. [Channel/tactic #1] — brought in [X] members\n2. [Channel/tactic #2] — brought in [X] members\n3. [Channel/tactic #3] — brought in [X] members\n\nWhat DIDN'T work:\n- Posting in random Facebook groups\n- Cold DMs (felt gross and converted terribly)\n- Waiting for Skool discovery to do the work\n\nThe first 100 is a grind. But once you're there, word-of-mouth kicks in.\n\nHow did you get YOUR first 100?`,
  },
  {
    id: 252,
    tab: 'skool' as const,
    category: 'Growth',
    title: `The #1 reason people stay in your Skool community (it's not content)`,
    body: `I surveyed my members and asked: "Why do you stay?"\n\nThe top answer wasn't the course. Wasn't the live calls. Wasn't the resources.\n\nIt was: the other members.\n\nPeople stay for relationships. They stay because they've found their people.\n\nContent gets them in the door. Community keeps them.\n\nIf you're obsessing over content and ignoring connection, you're solving the wrong problem.\n\nWhat do YOUR members say keeps them around?`,
  },
  {
    id: 253,
    tab: 'skool' as const,
    category: 'Growth',
    title: `Acquisition channels ranked: What's actually driving Skool signups in 2025`,
    body: `I've tracked every member signup source for the last [timeframe]. Here's my ranking:\n\n1. [Channel] — [X]% of signups\n2. [Channel] — [X]% of signups\n3. [Channel] — [X]% of signups\n4. [Channel] — [X]% of signups\n5. [Channel] — [X]% of signups\n\nThe surprise: [unexpected insight about a channel]\n\nThe disappointment: [channel that didn't perform as expected]\n\nWhat channels are working for your Skool community? I want to compare notes.`,
  },
  {
    id: 254,
    tab: 'skool' as const,
    category: 'Growth',
    title: `Stop trying to grow — focus on this instead`,
    body: `Hot take: most Skool community owners focus on growth too early.\n\nIf your existing members aren't engaged, adding more people just means more people ignoring you.\n\nBefore you grow, nail these:\n\n- Are members posting without you prompting them?\n- Are members talking to EACH OTHER (not just to you)?\n- Is your retention above [X]%?\n- Do members refer others without being asked?\n\nGrowth without retention is a leaky bucket.\n\nFix the bucket first. Then pour.`,
  },
  {
    id: 255,
    tab: 'skool' as const,
    category: 'Growth',
    title: `The "free challenge" funnel that fills my Skool community`,
    body: `This is my #1 growth strategy and I'll break it down step by step:\n\n1. Create a [X]-day free challenge related to your topic\n2. Promote it on [platform]\n3. Run the challenge INSIDE your free Skool community\n4. Deliver insane value during the challenge\n5. Offer paid community access at the end\n\nConversion rate: [X]%\n\nThe key is making the challenge so good that paying feels like a no-brainer.\n\nAnyone else using challenge funnels? What's your conversion rate?`,
  },
  {
    id: 256,
    tab: 'skool' as const,
    category: 'Growth',
    title: `YouTube → Skool: How I turn viewers into community members`,
    body: `YouTube is my #1 source of Skool members. Here's my exact process:\n\n- Every video mentions my Skool community naturally (not a hard sell)\n- I offer a specific freebie only available inside the community\n- The link is in every description + pinned comment\n- I respond to YouTube comments saying "great question — I go deeper on this inside the community"\n\nConversion: roughly [X] new members per [X] views\n\nWhat platform feeds YOUR Skool community? And how do you bridge them?`,
  },
  {
    id: 257,
    tab: 'skool' as const,
    category: 'Growth',
    title: `Affiliate/referral program: Is it worth it for Skool communities?`,
    body: `I tested an affiliate program for my Skool community. Here's the honest breakdown:\n\nSetup: [how you set it up]\nCommission: [X]% recurring\nResults after [timeframe]:\n- [X] affiliates signed up\n- [X] actually promoted\n- [X] members generated\n\nWas it worth it? [Your honest answer]\n\nThe biggest lesson: most affiliates do nothing. A few champions do everything.\n\nAre you running an affiliate program? What's your experience?`,
  },
  {
    id: 258,
    tab: 'skool' as const,
    category: 'Growth',
    title: `The Skool Games effect: Did competing actually grow my community?`,
    body: `Skool Games is designed to incentivize growth. So I went all in.\n\nHere's what happened:\n\nWeek 1: [X] new members\nWeek 2: [X] new members\nEnd of competition: [total new members]\n\nBut here's the nuance nobody talks about:\n\n- Quality of members during the push: [observation]\n- Retention of those members after: [observation]\n- Was the hustle sustainable? [observation]\n\nSkool Games can be a great growth catalyst — but only if you're strategic about it.\n\nWhat was YOUR Skool Games experience?`,
  },
  {
    id: 259,
    tab: 'skool' as const,
    category: 'Growth',
    title: `The collaboration strategy that doubled my Skool growth`,
    body: `Best growth hack I've found: partner with other Skool community owners.\n\nHere's what we did:\n\n1. Found a community in a complementary (not competing) niche\n2. Did a joint live event — I taught in their community, they taught in mine\n3. Cross-promoted to each other's audiences\n\nResult: [X] new members in one week. And they were HIGH quality because they came with a warm introduction.\n\nThis works because Skool owners understand Skool. The audience is pre-qualified.\n\nWho wants to try a collab?`,
  },
  {
    id: 260,
    tab: 'skool' as const,
    category: 'Growth',
    title: `Growing from 100 to 500 members: The awkward middle phase`,
    body: `The first 100 feels like a sprint. After 500, there's momentum.\n\nBut 100-500? That's the valley of despair.\n\nHere's what made the difference for me:\n\n- [Strategy 1]: Turned members into recruiters by [how]\n- [Strategy 2]: Leveraged [platform] consistently\n- [Strategy 3]: Made onboarding SO good that new members posted on day one\n\nThe awkward middle phase is where most Skool communities die. Not because the idea is bad — because the owner gives up.\n\nDon't give up in the valley.\n\nWhere are you in your growth journey?`,
  },

  // ============================================================
  // MONETIZATION (10 posts, IDs 261-270)
  // ============================================================
  {
    id: 261,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `My Skool pricing journey: From free to $[X]/month`,
    body: `Here's every price point I've charged and what happened:\n\nFree → Lots of members, zero commitment, low engagement\n$[low] → Better quality, still some tire-kickers\n$[mid] → Sweet spot — members who were serious but not priced out\n$[high] → Fewer members, insane engagement, higher revenue\n\nThe lesson: higher price doesn't always mean fewer members. It means different members.\n\nWhat's your current price point? And how did you land on it?`,
  },
  {
    id: 262,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `Free vs paid Skool community: The definitive answer (for me)`,
    body: `I've run both. Here's my honest comparison:\n\nFree community:\n- [X] members\n- [X]% posting regularly\n- Revenue: $0 direct, but [indirect revenue from upsells]\n\nPaid community:\n- [X] members\n- [X]% posting regularly\n- Revenue: $[X]/month\n\nMy take: [your definitive answer]\n\nThe real answer is it depends on your business model. But if you're not sure, start free and prove the value before charging.\n\nWhat's your experience?`,
  },
  {
    id: 263,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `The upsell stack that tripled my Skool revenue`,
    body: `Community membership is just the base.\n\nHere's my full monetization stack:\n\n1. Skool community: $[X]/month (recurring)\n2. [Upsell 1]: $[X] (e.g., group coaching, course, mastermind)\n3. [Upsell 2]: $[X]\n4. [Upsell 3]: $[X]\n\nThe community is the front door. The real revenue comes from what's behind it.\n\nKey: every upsell must be genuinely valuable. If it feels like a money grab, members will leave.\n\nWhat does your monetization stack look like?`,
  },
  {
    id: 264,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `When should you start charging for your Skool community?`,
    body: `I see this question constantly. Here's my framework:\n\nCharge when:\n- You have at least [X] pieces of content in the classroom\n- Members are getting tangible results\n- You're consistently showing up (posting, responding, live calls)\n- You've validated demand with a free version first\n\nDON'T charge when:\n- You're still figuring out your niche\n- The community is empty\n- You haven't proven the value yet\n\nCharging too early kills communities. Charging too late undervalues your work.\n\nWhen did you start charging?`,
  },
  {
    id: 265,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `Revenue milestone: $[X]K/month from Skool — here's the breakdown`,
    body: `I'm sharing this not to brag but to show what's possible and be transparent about how.\n\nMonthly revenue: $[X],000\n\nBreakdown:\n- [X] members × $[X]/month = $[X]\n- Upsell 1: $[X]\n- Upsell 2: $[X]\n\nExpenses:\n- Skool: $99/month\n- Tools: $[X]/month\n- Time: [X] hours/week\n\nProfit margin: [X]%\n\nIt took [X months] to get here. The first [X] months were brutal.\n\nAsk me anything about the numbers. Full transparency.`,
  },
  {
    id: 266,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `Annual vs monthly pricing on Skool: What converts better?`,
    body: `I tested both. Here's the data:\n\nMonthly at $[X]:\n- Conversion rate: [X]%\n- Average lifetime: [X] months\n- LTV: $[X]\n\nAnnual at $[X] (discounted):\n- Conversion rate: [X]%\n- Retention: [X]% renewed\n- LTV: $[X]\n\nWinner: [your answer]\n\nBut here's the nuance: [important caveat about your niche/audience]\n\nAre you offering annual? What discount do you give?`,
  },
  {
    id: 267,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `The pricing objection I hear most (and how I handle it)`,
    body: `"I can find this information for free on YouTube."\n\nYep. You can. Here's what I say:\n\n"You're not paying for information. You're paying for:\n- Curation (so you don't waste 100 hours finding the right videos)\n- Community (people on the same journey to learn with)\n- Accountability (someone who notices when you disappear)\n- Access (ask questions and get personalized answers)"\n\nInformation is free. Implementation support is not.\n\nWhat pricing objection do YOU hear most? How do you handle it?`,
  },
  {
    id: 268,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `I gave my Skool community away for free for 3 months. Here's why.`,
    body: `It wasn't charity. It was strategy.\n\nFor 3 months, I ran my community completely free. Here's what it bought me:\n\n1. Testimonials and case studies I could use forever\n2. Understanding of what members actually wanted (not what I assumed)\n3. A core group of founding members who became my biggest advocates\n4. Confidence to charge because I KNEW the value was there\n\nWhen I turned on pricing at $[X]/month, [X]% of free members converted.\n\nThe free period wasn't lost revenue. It was an investment.\n\nWould you consider this approach?`,
  },
  {
    id: 269,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `How I handle payment failures and involuntary churn on Skool`,
    body: `Nobody talks about this, but failed payments are silently killing your revenue.\n\nEvery month, [X]% of my members have payment failures. That's real money walking out the door.\n\nHere's my recovery process:\n\n1. [Step 1 — what you do when a payment fails]\n2. [Step 2 — follow-up]\n3. [Step 3 — last resort]\n\nRecovery rate: [X]%\n\nThis one process saved me $[X] last year.\n\nWhat's your approach to failed payments? Or are you just letting them slip?`,
  },
  {
    id: 270,
    tab: 'skool' as const,
    category: 'Monetization',
    title: `The $99/month Skool fee: Is it worth it? (My honest math)`,
    body: `Every Skool community costs $99/month to run. Is it worth it?\n\nLet's do the math for different scenarios:\n\n- 10 members at $29/month = $290 revenue → $191 profit. Tight but works.\n- 50 members at $49/month = $2,450 revenue → $2,351 profit. Comfortable.\n- 100 members at $99/month = $9,900 revenue → $9,801 profit. $99 is a rounding error.\n\nThe $99 fee filters out people who aren't serious. That's a feature, not a bug.\n\nBut if you're just starting... yeah, it can feel heavy.\n\nHow long did it take you to cover the $99?`,
  },

  // ============================================================
  // ENGAGEMENT (10 posts, IDs 271-280)
  // ============================================================
  {
    id: 271,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `The gamification debate: Is Skool's leaderboard helping or hurting?`,
    body: `Skool's built-in gamification (points, levels, leaderboard) is one of its standout features.\n\nBut is it actually driving meaningful engagement? Or just rewarding people who post the most?\n\nWhat I've noticed:\n- Pros: [your observations about what gamification does well]\n- Cons: [your observations about downsides]\n\nI've seen members chase points with low-quality posts. I've also seen the leaderboard motivate genuinely helpful behavior.\n\nWhat's YOUR take? Is the gamification working in your community?`,
  },
  {
    id: 272,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `My posting schedule that keeps engagement high (steal it)`,
    body: `I tested random posting vs. a consistent schedule. Night and day difference.\n\nHere's my current Skool posting schedule:\n\n- Monday: [Post type]\n- Tuesday: [Post type]\n- Wednesday: [Post type]\n- Thursday: [Post type]\n- Friday: [Post type]\n- Weekend: [Approach for weekends]\n\nBest performing day: [day]\nBest performing post type: [type]\nBest posting time: [time]\n\nConsistency beats creativity. Members know when to show up because I always show up.\n\nWhat's your posting schedule?`,
  },
  {
    id: 273,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `The 5 post types that get the most engagement in my Skool community`,
    body: `After [X] months and [X] posts, the data is clear:\n\n1. "Hot take" posts — controversial opinions get people talking\n2. "Show your work" posts — members love sharing their progress\n3. "This or that" posts — simple binary choices = easy engagement\n4. "I messed up" posts — vulnerability breeds connection\n5. [Your #5] — [why it works]\n\nWhat consistently DOESN'T work: long educational posts. Save those for the classroom.\n\nThe community tab is for conversation, not lectures.\n\nWhat post types work best in YOUR community?`,
  },
  {
    id: 274,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `How I deal with lurkers (without making them feel guilty)`,
    body: `80% of my Skool community lurks. They read everything but never post.\n\nI used to stress about this. Now I see it differently.\n\nLurkers are still getting value. They're still learning. They just participate differently.\n\nBut I DO try to activate them gently:\n\n1. [Tactic] — low-barrier engagement (polls, emoji reactions)\n2. [Tactic] — direct but no-pressure invitations to share\n3. [Tactic] — celebrating when a lurker finally posts\n\nThe worst thing you can do: publicly call out lurkers. That makes them leave, not engage.\n\nHow do you handle your lurkers?`,
  },
  {
    id: 275,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `Live calls vs. async posts: What drives more engagement on Skool?`,
    body: `I've done both extensively. Here's what I've found:\n\nLive calls:\n- Attendance: usually [X]% of members show up\n- Creates deeper connection\n- Hard to scale\n- Replays get [X]% views\n\nAsync posts:\n- Reach: [X]% of members see them\n- Lower barrier to engage\n- Can be done on your schedule\n- Easier to batch and plan\n\nMy verdict: [your conclusion]\n\nThe magic is actually in [your insight about combining both].\n\nWhat's driving more engagement in YOUR community?`,
  },
  {
    id: 276,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `The onboarding sequence that boosted my 30-day retention by [X]%`,
    body: `New members are the most likely to leave in the first 30 days.\n\nHere's the onboarding sequence that changed everything:\n\nDay 1: [What happens — welcome DM, intro post prompt, etc.]\nDay 3: [What happens]\nDay 7: [What happens]\nDay 14: [What happens]\nDay 30: [What happens]\n\nThe key insight: don't overwhelm them with content. Help them make ONE connection and get ONE quick win.\n\nA member who posts in the first 48 hours is [X]x more likely to stay.\n\nWhat does your onboarding look like?`,
  },
  {
    id: 277,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `Challenges and events: My engagement secret weapon`,
    body: `Nothing spikes engagement like a community challenge.\n\nHere's my framework:\n\n- Length: [X] days (long enough to build momentum, short enough to finish)\n- Theme: [tied to community topic]\n- Structure: Daily prompt or action item\n- Accountability: Members post their progress\n- Prize: [optional — sometimes just bragging rights]\n\nLast challenge results:\n- [X]% of members participated\n- [X] posts generated\n- [X] new member connections formed\n\nChallenges turn lurkers into posters. Every time.\n\nDo you run challenges? What format works?`,
  },
  {
    id: 278,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `The "dead zone" — what to do when engagement drops`,
    body: `Every Skool community hits dead zones. Periods where engagement tanks for no obvious reason.\n\nHere's what I've learned NOT to do:\n- Panic post 5 times a day\n- Send desperate "where is everyone?!" messages\n- Blame the algorithm\n\nHere's what I DO:\n\n1. [Action 1] — Check if it's a seasonal thing\n2. [Action 2] — Reach out to top contributors privately\n3. [Action 3] — Launch a micro-challenge or event\n4. [Action 4] — Post something genuinely vulnerable\n\nDead zones are normal. How you respond defines whether it's a dip or a decline.`,
  },
  {
    id: 279,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `Member-generated content: How to get your community to create FOR you`,
    body: `The healthiest Skool communities aren't owner-driven. They're member-driven.\n\nHere's how I shifted from me doing all the posting to members creating content:\n\n1. [Strategy] — Feature and celebrate member posts publicly\n2. [Strategy] — Create "member spotlight" series\n3. [Strategy] — Ask specific members to share their expertise\n4. [Strategy] — Make posting feel low-risk (no wrong answers culture)\n\nThe tipping point: when member posts get more engagement than my posts. That's when you know the community is alive.\n\nHow much of your content comes from members vs. you?`,
  },
  {
    id: 280,
    tab: 'skool' as const,
    category: 'Engagement',
    title: `The comment strategy that 10x'd my post engagement`,
    body: `Writing good posts is half the equation. The other half: how you respond to comments.\n\nMy rules:\n\n1. Reply to every comment within [X] hours\n2. Never give one-word replies — add value or ask a follow-up question\n3. Tag other members who might benefit from the conversation\n4. When someone shares a win, celebrate LOUDLY\n5. [Your additional rule]\n\nThe algorithm rewards posts with active comment sections. But more importantly — people come back when they feel heard.\n\nWhat's your comment strategy?`,
  },

  // ============================================================
  // OPERATIONS (10 posts, IDs 281-290)
  // ============================================================
  {
    id: 281,
    tab: 'skool' as const,
    category: 'Operations',
    title: `My daily Skool community routine (takes 45 minutes)`,
    body: `Here's exactly how I manage my community every day:\n\n7:00 AM — Check notifications, reply to overnight comments (10 min)\n7:15 AM — Post the day's content (already batched — 5 min)\n7:20 AM — Welcome new members + send intro DM (10 min)\n12:00 PM — Midday check-in, reply to new comments (10 min)\n5:00 PM — Final sweep, plan tomorrow's post (10 min)\n\nTotal: ~45 minutes/day\n\nI used to spend 3+ hours. Batching and systems changed everything.\n\nWhat does YOUR daily routine look like?`,
  },
  {
    id: 282,
    tab: 'skool' as const,
    category: 'Operations',
    title: `Tools I use alongside Skool (my full tech stack)`,
    body: `Skool does a lot, but I supplement with these tools:\n\n- [Tool 1]: For [purpose] — $[cost]/month\n- [Tool 2]: For [purpose] — $[cost]/month\n- [Tool 3]: For [purpose] — $[cost]/month\n- [Tool 4]: For [purpose] — Free\n\nTotal monthly cost (including Skool): $[total]\n\nThe tools I tried and ditched:\n- [Tool]: Because [reason]\n- [Tool]: Because [reason]\n\nKeep your stack lean. Every tool you add is complexity you have to manage.\n\nWhat tools are in YOUR Skool stack?`,
  },
  {
    id: 283,
    tab: 'skool' as const,
    category: 'Operations',
    title: `How I moderate my Skool community (without being a tyrant)`,
    body: `Moderation is an art. Too strict = dead community. Too loose = chaos.\n\nHere's my approach:\n\nRules I enforce:\n1. [Rule] — Zero tolerance\n2. [Rule] — Warning first, then removal\n3. [Rule] — Gentle redirect\n\nHow I handle violations:\n- First offense: [approach]\n- Second offense: [approach]\n- Third: [approach]\n\nI've only removed [X] members in [timeframe]. The key is setting expectations early so moderation is rarely needed.\n\nWhat's your moderation philosophy?`,
  },
  {
    id: 284,
    tab: 'skool' as const,
    category: 'Operations',
    title: `Batch content creation: How I create a month of Skool posts in one sitting`,
    body: `I don't create content daily. I batch it.\n\nHere's my process:\n\n1. Block 3-4 hours on [day of month]\n2. Open my content idea bank (I add to this all month)\n3. Write [X] posts in one sitting using templates\n4. Schedule them out across the month\n5. Leave room for [X] spontaneous/timely posts per week\n\nTools I use for batching: [tools]\n\nThis one system gave me back [X] hours per week and actually IMPROVED consistency.\n\nDo you batch? Or do you create in real-time?`,
  },
  {
    id: 285,
    tab: 'skool' as const,
    category: 'Operations',
    title: `When to hire help for your Skool community (and what to delegate first)`,
    body: `I resisted hiring for too long. I was doing everything myself and burning out.\n\nHere's what I delegated first (and what I kept):\n\nDelegated:\n- [Task] — to a [role], [X] hours/week, $[cost]\n- [Task] — to a [role]\n- [Task] — automated with [tool]\n\nKept for myself:\n- Writing posts (my voice matters)\n- Live calls (members want ME)\n- Strategic decisions\n\nThe first hire felt expensive. Then I realized my time was more expensive.\n\nAt what member count did you (or would you) hire help?`,
  },
  {
    id: 286,
    tab: 'skool' as const,
    category: 'Operations',
    title: `How I organize my Skool Classroom (and avoid the "Netflix problem")`,
    body: `The Netflix problem: too much content, members don't know where to start.\n\nHere's how I structure my Classroom to avoid this:\n\n- Module 1: [Start Here — orientation, quick win]\n- Module 2-[X]: [Core content — logical progression]\n- Module [X]: [Advanced/bonus]\n\nRules I follow:\n1. Each module has a clear outcome\n2. Lessons are under [X] minutes\n3. There's always a "do this now" action item\n4. [Your rule]\n\nI reorganized my Classroom [X months ago] and completion rates went from [X]% to [X]%.\n\nHow is your Classroom structured?`,
  },
  {
    id: 287,
    tab: 'skool' as const,
    category: 'Operations',
    title: `The welcome DM template that gets 80%+ reply rate`,
    body: `First impressions matter. Here's the DM I send every new member:\n\n---\n\nHey [name]! Welcome to [community name].\n\nQuick question to help me help you:\n\nWhat's the #1 thing you're hoping to get out of this community?\n\n(No wrong answers — I genuinely want to know so I can point you to the right resources.)\n\n---\n\nThat's it. Short, personal, asks one question.\n\nReply rate: [X]%+\n\nThe replies also give me incredible data about what members actually want.\n\nWhat's your welcome DM look like?`,
  },
  {
    id: 288,
    tab: 'skool' as const,
    category: 'Operations',
    title: `Scaling from 1 community to multiple: Lessons from my experience`,
    body: `I now run [X] Skool communities. Here's what I learned about scaling:\n\nDon't scale until:\n- Your first community runs without you for [X] days\n- You have systems documented\n- You have at least one person helping\n\nWhat changes at scale:\n- [Operational change]\n- [Time management change]\n- [Quality control change]\n\nWhat stays the same:\n- Members want to feel seen\n- Consistency matters more than anything\n\nThe biggest mistake: launching community #2 before community #1 is self-sustaining.`,
  },
  {
    id: 289,
    tab: 'skool' as const,
    category: 'Operations',
    title: `Time management for Skool community owners: What I've learned the hard way`,
    body: `Your community will eat all available time if you let it.\n\nBoundaries I've set:\n\n1. [Boundary] — e.g., No community work after 6pm\n2. [Boundary] — e.g., Notification check-ins only 3x per day\n3. [Boundary] — e.g., One "community-free" day per week\n4. [Boundary] — e.g., Batched DM responses, not real-time\n\nThe mindset shift: you are not an on-call customer service rep. You're a community leader. Leaders set the pace, not the other way around.\n\nWhat boundaries have you set (or need to set)?`,
  },
  {
    id: 290,
    tab: 'skool' as const,
    category: 'Operations',
    title: `SOPs that saved my Skool community (free templates)`,
    body: `I document everything now. Here are the SOPs that run my community:\n\n1. New Member Onboarding SOP\n   - Step-by-step process for welcoming + activating new members\n\n2. Content Publishing SOP\n   - How posts are created, reviewed, and published\n\n3. Moderation SOP\n   - How violations are handled, escalation process\n\n4. Monthly Review SOP\n   - Metrics to check, decisions to make\n\n5. [Your additional SOP]\n\nIf you can't take a week off without your community suffering, you need SOPs.\n\nWant me to share my templates? Drop a comment below.`,
  },

  // ============================================================
  // LESSONS (10 posts, IDs 291-300)
  // ============================================================
  {
    id: 291,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `The #1 mistake I made in my first year on Skool`,
    body: `I treated my Skool community like a course.\n\nI dumped content into the Classroom. Barely posted in the Community tab. Thought if I just had great content, people would stay.\n\nThey didn't.\n\nPeople came for the content but stayed (or left) based on the COMMUNITY.\n\nThe day I shifted from "content creator" to "community builder," everything changed.\n\nMore posts. More questions. More conversations. Less lecturing.\n\nMy engagement tripled in 30 days.\n\nWhat was YOUR biggest first-year mistake?`,
  },
  {
    id: 292,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `10 things I'd do differently if I started my Skool community today`,
    body: `Starting over with everything I know now:\n\n1. Start with a free community to validate demand\n2. Focus on 1 transformation, not 10 topics\n3. Post daily from day 1 (even with 0 members)\n4. Build the classroom AFTER understanding what members need\n5. Set boundaries with my time immediately\n6. [Lesson 6]\n7. [Lesson 7]\n8. [Lesson 8]\n9. [Lesson 9]\n10. [Lesson 10]\n\nWhich of these resonates most with you? And what would be on YOUR list?`,
  },
  {
    id: 293,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `Counterintuitive truth: Less content = more engagement`,
    body: `This goes against everything content creators believe.\n\nWhen I reduced my posting frequency from [X] posts/day to [X] posts/day, engagement per post went UP.\n\nWhy:\n- Members weren't overwhelmed\n- Each post felt more intentional\n- People had time to actually engage before the next post buried it\n- Quality naturally improved because I wasn't in content-hamster-wheel mode\n\nMore content ≠ more value.\n\nThe right content at the right frequency = more value.\n\nHas anyone else experienced this?`,
  },
  {
    id: 294,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `Advice for someone launching a Skool community this week`,
    body: `If you're launching this week, here's what matters and what doesn't:\n\nMatters:\n- Having a clear "who is this for" answer\n- Posting consistently from day 1\n- Personally welcoming every single member\n- Asking more questions than you answer\n\nDoesn't matter (yet):\n- Perfect branding\n- Complete classroom\n- Fancy welcome video\n- Having all your systems in place\n\nDone beats perfect. Always.\n\nLaunch messy. Improve weekly. That's the playbook.\n\nAnyone launching soon? Drop your community below — we'll support you.`,
  },
  {
    id: 295,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `The hard truth about Skool community churn (and what to do about it)`,
    body: `Members will leave. It's not a matter of if, but when and why.\n\nMy churn data:\n- Monthly churn rate: [X]%\n- Top reason for leaving: [reason]\n- Second reason: [reason]\n- Average member lifespan: [X] months\n\nWhat I've done to reduce churn:\n1. [Strategy] — reduced churn by [X]%\n2. [Strategy] — made a noticeable difference\n3. [Strategy] — surprisingly effective\n\nYou will never have 0% churn. But you can build a community that's worth staying in.\n\nWhat's your churn rate? And what's your biggest churn-reduction win?`,
  },
  {
    id: 296,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `The "community of one" problem (and how I solved it)`,
    body: `For the first [X] months, my Skool community was basically a blog.\n\nI posted. Members consumed. Crickets.\n\nThe problem: I was the only one creating. It was a community of one.\n\nThe fix:\n\n1. I started ending every post with a specific question\n2. I highlighted and celebrated member responses\n3. I publicly acknowledged member expertise\n4. I sometimes posted WRONG takes on purpose to spark debate\n\nA community is a conversation. If you're the only one talking, it's a monologue.\n\nHow did you break out of the "community of one" phase?`,
  },
  {
    id: 297,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `What nobody tells you about running a Skool community for 6+ months`,
    body: `Month 1-3: Excitement. Everything is new. You're posting with fire.\n\nMonth 4-6: The dip. Novelty wears off. Growth slows. Doubts creep in.\n\nMonth 6+: This is where it gets interesting.\n\nThings that surprised me after 6 months:\n\n1. [Surprise/lesson]\n2. [Surprise/lesson]\n3. [Surprise/lesson]\n4. [Surprise/lesson]\n\nThe community owners who win aren't the most talented. They're the most consistent.\n\nIf you're in months 4-6 right now — keep going. The other side is worth it.`,
  },
  {
    id: 298,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `Stop copying other Skool communities (do this instead)`,
    body: `I wasted months trying to replicate what successful Skool communities were doing.\n\nTheir posting style. Their classroom structure. Their pricing.\n\nIt didn't work because I'm not them and my audience isn't their audience.\n\nWhat worked instead:\n\n1. Ask MY members what they want (not assume based on what other communities offer)\n2. Double down on MY unique perspective and style\n3. Build based on data from MY community, not someone else's playbook\n\nInspiration is fine. Imitation is a trap.\n\nWhat's something unique about YOUR community that nobody else does?`,
  },
  {
    id: 299,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `The lesson that took me the longest to learn on Skool`,
    body: `It took me [X] months to truly understand this:\n\nYour community's culture is set in the first [X] weeks.\n\nThe tone of your first posts. How you respond to the first comments. What behavior you reward. What you tolerate.\n\nAll of that becomes the unwritten rules.\n\nI had to rebuild my community culture once because I let the wrong norms set in early. It was painful.\n\nNow I'm intentional about culture from day one.\n\nWhat lesson took YOU the longest to learn?`,
  },
  {
    id: 300,
    tab: 'skool' as const,
    category: 'Lessons',
    title: `If I could only give one piece of Skool advice, it would be this`,
    body: `After [X] months of running a Skool community, thousands of posts, hundreds of members, and countless lessons learned...\n\nIf I could only give one piece of advice, it would be:\n\n[Your one piece of advice]\n\nNot tactics. Not hacks. Not growth strategies.\n\nJust [distill the core principle].\n\nEverything else is a downstream effect of getting this one thing right.\n\nWhat would YOUR one piece of advice be? Make it count — you only get one.\n\nDrop it below. Let's make this the most valuable thread in the community.`,
  },

];

/* ──────────────────────────────────────────────
   COMBINE ALL POSTS
   ────────────────────────────────────────────── */
const allPosts: Post[] = [...socialPosts, ...contentPosts, ...skoolPosts];

/* ──────────────────────────────────────────────
   TAB & CATEGORY CONFIGURATION
   ────────────────────────────────────────────── */
const tabConfig = {
  social: {
    label: 'Social Posts',
    description: '45 posts — Wins, Strategy, Mindset, Tips & Internal',
    categories: ['Wins', 'Strategy', 'Mindset', 'Tips', 'Internal'],
  },
  content: {
    label: 'Content & Views',
    description: '50 posts — Hooks, Wins, Strategy, Tactics & Stories',
    categories: ['Hooks', 'Wins', 'Strategy', 'Tactics', 'Stories'],
  },
  skool: {
    label: 'Skool',
    description: '100 posts — Connection, Celebration, Reflection, Question, Story, Growth, Monetization, Engagement, Operations & Lessons',
    categories: ['Connection', 'Celebration', 'Reflection', 'Question', 'Story', 'Growth', 'Monetization', 'Engagement', 'Operations', 'Lessons'],
  },
} as const;

type TabKey = keyof typeof tabConfig;

const categoryColors: Record<string, { border: string; bg: string; badge: string }> = {
  // Social
  Wins: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/20 text-emerald-300' },
  Strategy: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: 'bg-blue-500/20 text-blue-300' },
  Mindset: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-300' },
  Tips: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: 'bg-amber-500/20 text-amber-300' },
  Internal: { border: 'border-rose-500/40', bg: 'bg-rose-500/10', badge: 'bg-rose-500/20 text-rose-300' },
  // Content
  Hooks: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/20 text-cyan-300' },
  Tactics: { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: 'bg-orange-500/20 text-orange-300' },
  Stories: { border: 'border-pink-500/40', bg: 'bg-pink-500/10', badge: 'bg-pink-500/20 text-pink-300' },
  // Skool
  Connection: { border: 'border-violet-500/40', bg: 'bg-violet-500/10', badge: 'bg-violet-500/20 text-violet-300' },
  Celebration: { border: 'border-sky-500/40', bg: 'bg-sky-500/10', badge: 'bg-sky-500/20 text-sky-300' },
  Reflection: { border: 'border-fuchsia-500/40', bg: 'bg-fuchsia-500/10', badge: 'bg-fuchsia-500/20 text-fuchsia-300' },
  Question: { border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', badge: 'bg-yellow-500/20 text-yellow-300' },
  Story: { border: 'border-red-500/40', bg: 'bg-red-500/10', badge: 'bg-red-500/20 text-red-300' },
  // Skool (additional)
  Growth: { border: 'border-lime-500/40', bg: 'bg-lime-500/10', badge: 'bg-lime-500/20 text-lime-300' },
  Monetization: { border: 'border-teal-500/40', bg: 'bg-teal-500/10', badge: 'bg-teal-500/20 text-teal-300' },
  Engagement: { border: 'border-indigo-500/40', bg: 'bg-indigo-500/10', badge: 'bg-indigo-500/20 text-indigo-300' },
  Operations: { border: 'border-zinc-400/40', bg: 'bg-zinc-400/10', badge: 'bg-zinc-400/20 text-zinc-300' },
  Lessons: { border: 'border-amber-400/40', bg: 'bg-amber-400/10', badge: 'bg-amber-400/20 text-amber-300' },
};

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */
export default function ContentLibrary() {
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copyType, setCopyType] = useState<string>('');

  const config = tabConfig[activeTab];

  const filtered = useMemo(() => {
    let posts = allPosts.filter((p) => p.tab === activeTab);
    if (activeCategory) {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeTab, activeCategory, search]);

  async function copyToClipboard(post: Post, type: 'title' | 'body' | 'full') {
    const text =
      type === 'title'
        ? post.title
        : type === 'body'
          ? post.body
          : `${post.title}\n\n${post.body}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(post.id);
      setCopyType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopyType('');
      }, 2000);
    } catch {
      // fallback
    }
  }

  function switchTab(tab: TabKey) {
    setActiveTab(tab);
    setActiveCategory(null);
    setSearch('');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Content Library
          <span className="block text-lg md:text-xl font-normal text-neutral-400 mt-2">
            Post Templates
          </span>
        </h1>
        <p className="text-center text-neutral-500 text-sm mb-1">
          {allPosts.length} ready-to-use posts for social, content & Skool engagement
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex gap-2 bg-white/5 rounded-xl p-1.5">
          {(Object.keys(tabConfig) as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tabConfig[tab].label}
              <span className="hidden sm:inline text-xs ml-1 opacity-70">
                ({allPosts.filter((p) => p.tab === tab).length})
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-neutral-500 text-xs mt-2">
          {config.description}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition"
        />
      </div>

      {/* Category Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-white/15 text-white'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All ({allPosts.filter((p) => p.tab === activeTab).length})
          </button>
          {config.categories.map((cat) => {
            const count = allPosts.filter(
              (p) => p.tab === activeTab && p.category === cat
            ).length;
            const colors = categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? `${colors?.bg} ${colors?.badge}`
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <p className="text-neutral-500 text-sm text-center">
          Showing {filtered.length} post{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            No posts match your search.
          </div>
        ) : (
          filtered.map((post) => {
            const colors = categoryColors[post.category] || {
              border: 'border-white/10',
              bg: 'bg-white/5',
              badge: 'bg-white/10 text-neutral-300',
            };
            return (
              <div
                key={post.id}
                className={`rounded-2xl p-6 border-2 ${colors.border} ${colors.bg} hover:border-opacity-80 transition-all`}
              >
                {/* Card header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                  <div className="flex-1">
                    <span
                      className={`text-xs px-3 py-1 rounded-lg ${colors.badge} inline-block mb-2 font-medium uppercase tracking-wide`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg text-white leading-tight">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(post, 'title')}
                      className={`text-xs px-3 py-2 rounded-lg transition font-medium ${
                        copiedId === post.id && copyType === 'title'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'title'
                        ? 'Copied!'
                        : 'Title'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(post, 'body')}
                      className={`text-xs px-3 py-2 rounded-lg transition font-medium ${
                        copiedId === post.id && copyType === 'body'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'body'
                        ? 'Copied!'
                        : 'Body'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(post, 'full')}
                      className={`text-xs px-4 py-2 rounded-lg transition font-bold ${
                        copiedId === post.id && copyType === 'full'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'full'
                        ? 'Copied!'
                        : 'FULL'}
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <pre className="text-neutral-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {post.body}
                </pre>
              </div>
            );
          })
        )}
      </div>

      {/* Toast */}
      {copiedId !== null && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-pulse">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
