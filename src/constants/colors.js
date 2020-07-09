import color from 'color';

/***
 * Keeping this file as javascript gives us the ability to 
 * dynamically build our object and retain type inference.
 * Typescript requires us to define the fields and their 
 * types upfront making it inconvenient.
 * #0F5846
 * #F4821C
*/

const colors = {};
colors.primary = '#417C6D';
colors.primary_dark = color(colors.primary).darken(0.3).toString();
colors.primary_light = '#417C6D';
colors.primary_washed = '#E8EFEC';
colors.primary_verylight = "#BBD6CF";
colors.primary_chatbox_1 = "#D6BBC2";
colors.primary_chatbox_2 = "#BBD1D6";
colors.accent = '#8FE6C9';
colors.white = '#EEEEEE';
colors.offwhite = '#DDDDDD';
colors.black = '#000000';
colors.grey = '#B7B7C3';
colors.text = '#373567';
colors.error = '#CC0000';
colors.outline = colors.accent;
export default colors;