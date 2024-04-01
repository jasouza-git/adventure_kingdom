# Rise of the Aswang King
A game for the hackathon by CPU CSS of April 2024 themed Arcade

## Need list
 - [ ] Background tiles
 - [ ] Game plan

## Code Documentation
<details>
    <summary><code>/assets</code> - Contains all the game assets</summary>
    <h3>Images</h3>
    <ul>
        <li>Aswang.png</li>
        <li>MC.png</li>
        <li>Rise_of_the_Aswang_King.png</li>
        <li>spirtes.png</li>
    </ul>
</details>
<details open>
    <summary><code>/plan</code> - Contains all the game plans or ideas</summary>
  	<h3>Plan Documentations</h3>
  <p><a href="./plan/0.-Plans-Overview.md">Plans Overview</a></p>
</details>
<details open>
    <summary><code>/engine.js</code> - Contains the <code>game</code> class nessary for executing the game</summary>
    <h3>Canvas</h3>
    Create a new game session by coding:
    <pre><code class="lang-javascript"><span class="hljs-built_in">var</span> main = <span class="hljs-built_in">new</span> game(width, height, dom);</code></pre>
    <ul>
        <li><b>dom</b> - Canvas DOM Element</li>
        <li><b>w</b> - Width in pixels</li>
        <li><b>h</b> - Height in pixels</li>
        <li><b>z</b> - Size of 1 asset pixel in pixels</li>
        <li><b>fps</b> - Target Frames per second</li>
    </ul>
    <h3>Load</h3>
    <p>Methods inside the <code>load</code> method, this is reponsable for loading/managing the files located in <code>/asset</code> and then triggering the <code>loop</code> then finished. To load a set of files type:</p>
    <pre><code class="lang-javascript"><span class="hljs-built_in">main</span>.load.files</span>(<span class="hljs-string">"sprites.png"</span>, <span class="hljs-string">"music.mp3"</span>);</code></pre>
    <ul>
        <li><b>todo, data, done</b> - Responsible for keeping track of loaded files</li>
        <li><code class="lang-javascript"><span class="hljs-built_in">get</span>(file)</code> - Returns the data for the loaded file</li>
        <li><code class="lang-javascript"><span class="hljs-built_in">check</span>()</code> - Checks if finished loading files, if not then display loading bar else trigger loop</li>
        <li><code class="lang-javascript"><span class="hljs-built_in">files</span>(file1,file2,...)</code> - Begins the loading process</li>
    </ul>
    <h3>Scene</h3>
    <p>These methods are responable for managing the game scenes, example of this:</p>
    <pre><code class="lang-javascript"><span class="hljs-built_in">main</span>.scene(<span class="hljs-string">"menu"</span>, <span class="hljs-function"><span class="hljs-params">(ms_since_start, ms_since_last_frame)</span> =&gt;</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-comment">// Code for scene here</span><br>});</code></pre>
    <ul>
        <li><b>scenes</b> - Dictionary of all the game scenes</li>
        <li><b>active_scene</b> - The active scene currently in display</li>
        <li><code class="lang-javascript"><span class="hljs-built_in">scene</span>(id, scene?)</code> - If <code>scene</code> is undefined then load scene by id, else add <code>scene</code> to <code>scenes</code></li>
    </ul>
    <h3>Loop</h3>
    <p>These methods are responsable for looping the game code, <i>(Not to be used publicly)</i></p>
    <ul>
        <li><b>time, timenew</b> - Stores time since start and last frame</li>
        <li><b>looper</b> - The interval loop, <code>clearInterval(main.looper)</code> to end loop</li>
        <li><b>loop</b> - Runs current scene and manages events</li>
    </ul>
    <h3>Event</h3>
    <p>These methods are responable for managing events like keyboard, mouse, or joystick. For example:</p>
    <pre><code class="lang-javascript"><span class="hljs-built_in">main</span>.on(<span class="hljs-string">"a"</span>, <span class="hljs-function"><span class="hljs-params">info</span> =&gt;</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-comment">// Event action here</span><br>});</code></pre>
    <ul>
        <li><b>events</b> - Dictionary of event listeners</li>
        <li><b>keydown</b> - Dictionary of currently pressed keys</li>
        <li><code><span class="hsjs-built_in">on(event, action)</code> - Adds an event listentener</li>
    </ul>
    <h3>Entity</h3>
    <p><code><span class="hljs-built_in">entity</span>(type, modification?)</code> This method creates a new entity</p>
    <pre><code class="lang-javascript"><span class="hljs-attribute">player</span> = <span class="hljs-built_in">main</span>.entity(<span class="hljs-string">"player"</span>, {name: <span class="hljs-string">"John"</span>});</code></pre>
    <h3>Sprite</h3>
    <p><code><span class="hljs-built_in">sprite</span>(img, x, y, cx, cy, cw, ch, fx, fy)</code> This method renders a sprite for example</p>
    <pre><code class="lang-javascript"><span class="hljs-built_in">main</span>.sprite(<span class="hljs-string">"sprites.png"</span>, <span class="hljs-number">0</span>,<span class="hljs-number">64</span>,<span class="hljs-number">32</span>,<span class="hljs-number">32</span>);</code></pre>
    <ul>
        <li><b>img</b> - Image name</li>
        <li><b>x</b> - X position</li>
        <li><b>y</b> - Y position</li>
        <li><b>cx</b> - Clipped X position</li>
        <li><b>cy</b> - Clipped Y position</li>
        <li><b>cw</b> - Clipped width</li>
        <li><b>ch</b> - Clipped height</li>
        <li><b>fx</b> - Flip X? <i>(Optional)</i></li>
        <li><b>fy</b> - Flip Y? <i>(Optional)</i></li>
    </ul>
    <h3>Draw</h3>
    <p><code><span class="hljs-built_in">draw</span>(type, data)</code> This method draws entities</p>
</details>
<details>
    <summary><code>/entities.js</code> - Contains the <code>entities</code> object which stores each entities informations and functions</summary>
</details>
<details>
    <summary><code>/game.js</code> - Contains the actual game code responsable for commanding the game</summary>
</details>