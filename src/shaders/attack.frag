uniform vec2 resolution;
void main()
{
    vec2 pos = gl_FragCoord.xy / resolution.xy;
    vec4 texColor = vec4(1.0, pos.x, pos.y, 1.0);
    gl_FragColor = texColor;
}