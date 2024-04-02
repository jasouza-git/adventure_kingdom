# Rise of the Aswang King
A game for the hackathon by CPU CSS of April 2024 themed Arcade

## Need list
 - [ ] Background tiles
 - [ ] Game plan

## Code Documentation
<style>
details {
    padding-left: 10px;
    border-left: 2px solid #fff2;
    margin-bottom: 20px;
}
</style>
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
<details>
    <summary><code>/engine.ts</code> - Contains the <code>engine</code> class nessary for executing the game</summary>
    <table>
        <tr><th>Public Methods</th><th>Type</th><th>Default</th><th>Description</th><tr>
        <tr><td><code><span class="hljs-built_in">constructor</span>(width<span class="hljs-attr">?:number</span>, height<span class="hljs-attr">?:number</span>, dom<span class="hljs-attr">?:HTMLCanvasElement</span>)</code></td><td>void</td><td></td><td>Constructor in creating a game session</td><tr>
        <tr><td>dom</td><td>HTMLCanvasElement</td><td>New Canvas</td><td>Canvas element responsible for displaying graphics</td><tr>
        <tr><td>w</td><td>number</td><td>320</td><td>Width of Canvas</td><tr>
        <tr><td>h</td><td>number</td><td>240</td><td>Height of Canvas</td><tr>
        <tr><td>z</td><td>number</td><td>w/320</td><td>Size of 1 asset pixel to canvas pixel</td><tr>
        <tr><td>fps</td><td>number</td><td>30</td><td>Target frames per second</td><tr>
        <tr><td><code><span class="hljs-built_in">load</span>(...files<span class="hljs-attr">:string[]</span>)</code></td><td>void</td><td></td><td>Load files into cache from <code>/asset</code></td><tr>
        <tr><td><code><span class="hljs-built_in">start_loop</span>()</code></td><td>void</td><td></td><td>Starts game loop, trigger by default after <code>load</code></td><tr>
        <tr><td><code><span class="hljs-built_in">stop_loop</span>()</code></td><td>void</td><td></td><td>Stops game loop</td><tr>
        <tr><td><code><span class="hljs-built_in">scene</span>(id<span class="hljs-attr">:string</span>, scene<span class="hljs-attr">?:(dt_start:number,dt_last:number)=>void</span>)</code></td><td>void</td><td></td><td>If <code>scene</code> is undefined or there is no current scene then set <code>id</code> has current scene, if scene is defined then add <code>scene</code> with <code>id</code></td><tr>
        <tr><td><code><span class="hljs-built_in">on</span>(event<span class="hljs-attr">:string</span>, action<span class="hljs-attr">:(...args:any[])=>any</span>)</code></td><td>void</td><td></td><td>Adds an event listener for keyboard or joystick, if inside <code>scene</code> method then only listening if that scene is currently activated, else listening at all times</td><tr>
        <tr><td>sprite_boxed</td><td>boolean</td><td>false</td><td>For debuging, displays a red box on each sprite</td><tr>
        <tr><td><code><span class="hljs-built_in">sprite</span>(img<span class="hljs-attr">:string</span>, x<span class="hljs-attr">:number</span>, y<span class="hljs-attr">:number</span>, cx<span class="hljs-attr">:number</span>, cw<span class="hljs-attr">:number</span>, ch<span class="hljs-attr">:number</span>, x<span class="hljs-attr">:number</span>, fx<span class="hljs-attr">?:boolean</span>, fy<span class="hljs-attr">?:boolean</span>)</code></td><td>void</td><td><code>fx=false</code>, <code>fy=false</code></td><td>Draws a clipped image from a sprite image
            <table>
                <tr><th>Argument</th><th>Description</th></tr>
                <tr><td>img</td><td>The sprite image, ensure it is already loaded in memory!</td></tr>
                <tr><td>x</td><td>X direction to put the clipped image</td></tr>
                <tr><td>y</td><td>Y direction to put the clipped image</td></tr>
                <tr><td>cx</td><td>X direction in sprite image to clip</td></tr>
                <tr><td>cy</td><td>Y direction in sprite image to clip</td></tr>
                <tr><td>cw</td><td>Width of clipped area in sprite image</td></tr>
                <tr><td>ch</td><td>Height of clipped area in sprite image</td></tr>
                <tr><td>fx</td><td>Flip clipped image in the X direction?</td></tr>
                <tr><td>fy</td><td>Flip clipped image in the Y direction?</td></tr>
            </table>
        </td><tr>
        <tr><td><code><span class="hljs-built_in">draw</span>(type<span class="hljs-attr">?:string</span>, data<span class="hljs-attr">?:{[index:string]:any}</span>)</code></td><td>void</td><td></td><td>For debuging, draws an entity of type <code>type</code> with <code>data</code> has its data without its behavior</td><tr>
        <tr><td><code><span class="hljs-built_in">render</span>(p<span class="hljs-attr">?:HTMLElement</span>)</code></td><td>void</td><td><code>p=document.body</code></td><td>Inserts the canvas element to parent element which by default is the page body</td><tr>
    </table>
</details>
<details open>
    <summary><code>/entities.ts</code> - Contains the <code>entities</code> object which stores each entities informations and functions</summary>
    <p>The <code>entities</code> object contains every entities in the game where the entity <code>id</code> is the object's property containing their rendering, behavior, defaults, etc. Here is the list of each entities properties:</p>
    <table>
        <tr><th>Property</th><th>Required?</th><th>Type</th><th>Description</th><tr>
        <tr><td>default</td><td>true</td><td><code>{[key:string]:any}</code></td><td>The default parameters of an entity</td><tr>
        <tr><td>render</td><td>false</td><td><code>(data:{[key:string]:any}, dt:number, game:engine_type)=>void</code></td><td>Updates the entity every loop from drawing it to coding behaviors where <code>data</code> is the entity's parameter, <code>dt</code> is the number of miliseconds since last updated, and <code>game</code> is the game session the entity is on</td><tr>
        <tr><td>create</td><td>false</td><td><code>(args:{[prop:string]:any})=>{[prop:string]:any}</code></td><td>Creates parameters for newly created entities</td><tr>
    </table>
    <pre><code class="lang-javascript"><span class="hljs-built_in">import</span> {entities_type} <span class="hljs-built_in">from</span> <span class="hljs-string">"./types.ts"</span>;
<span class="hljs-built_in">let</span> entities<span class="hljs-attr">:entities_type</span> = {
    <span class="hljs-comment">// Entity with ID "titlecard"</span>
    titlecard: {
        <span class="hljs-comment">// Default parameters of the titlecard entity</span>
        default: {size: <span class="hljs-number">0.5</span>},
        <span class="hljs-comment">// Update the entity by adding the shrinking behavior and drawing it</span>
        update: (d, dt, o) => {
            <span class="hljs-comment">// Decrease size exponentally by 50% every second</span>
            <span class="hljs-built_in">d</span>.size *= <span class="hljs-number">0.5</span>*(<span class="hljs-number">1</span>-dt/<span class="hljs-number">1000</span>);
            <span class="hljs-comment">// Draw a sprite</span>
            <span class="hljs-built_in">o</span>.sprite(<span class="hljs-string">"titlecard.png"</span>, <span class="hljs-built_in">o</span>.w*(<span class="hljs-number">1</span>-<span class="hljs-built_in">d</span>.size)/<span class="hljs-number">2</span>, <span class="hljs-built_in">o</span>.h*<span class="hljs-number">0.5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">200</span>, <span class="hljs-number">100</span>);
        },
    }
};
<span class="hljs-built_in">export</span> {entities};</code></pre>
</details>
<details>
    <summary><code>/game.ts</code> - Contains the actual game code responsable for commanding the game</summary>
    <p>Here is an example of <code>/game.js</code> with comments using the class <code>engine</code> defined in <code>/engine.ts</code>:</p>
    <pre><code class="lang-javascript"><span class="hljs-comment">// Import engine class</span>
<span class="hljs-built_in">import</span> {engine} <span class="hljs-built_in">from</span> <span class="hljs-string">"./engine.ts"</span>;
<span class="hljs-comment">// Create new game session with 640x480 screen</span>
<span class="hljs-built_in">let</span> game = <span class="hljs-built_in">new</span> engine(<span class="hljs-number">640</span>, <span class="hljs-number">480</span>);</code>
<span class="hljs-comment">// Display canvas into html body</span>
<span class="hljs-built_in">game</span>.render();</code>
<span class="hljs-comment">// Load nessary files into memory</span>
<span class="hljs-built_in">game</span>.load(<span class="hljs-string">"sprites.png"</span>, <span class="hljs-string">"sprites.png"</span>, <span class="hljs-string">"music.mp3"</span>);
<span class="hljs-comment">// Create new scene by default it become the active scene</span>
<span class="hljs-built_in">game</span>.scene(<span class="hljs-string">"menu"</span>, (t, dt) => {
    <span class="hljs-comment">// Draw the title card entity defined from "entity.ts"</span>
    <span class="hljs-built_in">game</span>.draw(<span class="hljs-string">"titlecard"</span>);
    <span class="hljs-comment">// Draw the play button entity with parameters</span>
    <span class="hljs-built_in">game</span>.draw(<span class="hljs-string">"play"</span>, {text: <span class="hljs-string">"Play!"</span>});
    <span class="hljs-comment">// Switch to next scene when the "Enter" or "Space" key is pressed</span>
    <span class="hljs-built_in">game</span>.on(<span class="hljs-string">"enter,space"</span>, ()=><span class="hljs-built_in">game</span>.scene(<span class="hljs-string">"level1"</span>));
});
<span class="hljs-comment">// Create entity has player</span>
<span class="hljs-built_in">let</span> player = <span class="hljs-built_in">game</span>.entity(<span class="hljs-string">"player"</span>);
<span class="hljs-comment">// Create next scene named "level1"</span></code>
<span class="hljs-built_in">game</span>.scene(<span class="hljs-string">"menu"</span>, (t, dt) => {
    <span class="hljs-comment">// Update the player</span>
    <span class="hljs-built_in">game</span>.add(<span class="hljs-built_in">player</span>);
});
</code></pre>
</details>