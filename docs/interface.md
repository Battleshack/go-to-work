# Game Interface Documentation

## HUD (Heads-Up Display)

The HUD is the primary information display area at the top of the game screen. It provides essential game statistics and progress information to the player.

### Specifications
- Position: Topmost area of the screen
- Width: 100% of screen width
- Height: 116px
- Padding: 10px on all sides
- Layout: Horizontal with space-between distribution for full width utilization

### HUD Elements and Dimensions

1. **Career Level**
   - Width: 230px
   - Height: 96px
   - Font: Jaro
   - Text color: #FF522E
   - Stroke color: #820B1C
   - Stroke weight: 8px
   - Format: "Level X"

2. **Money Holdings**
   - Width: 172px
   - Height: 64px
   - Font size: 2rem
   - Text color: #46C97D
   - Stroke color: #1D571F
   - Stroke weight: 8px
   - Format: "X NOK"

3. **Points**
   - Width: 131px
   - Height: 64px
   - Font size: 2rem
   - Text color: #F0F557
   - Stroke color: #9C702B
   - Stroke weight: 8px
   - Format: "X points"

4. **Tasks**
   - Width: 650px
   - Height: 64px
   - Font size: 2rem
   - Text color: #0FB0C1
   - Stroke color: #0F5057
   - Stroke weight: 8px
   - Format: "X tasks"

### Layout
The HUD elements are distributed evenly across the full width using space-between alignment and are bottom-aligned within the HUD container. Each element has specific dimensions and text styling to ensure consistency and readability. All elements are bottom-aligned within their containers for visual consistency. The Career Level uses the Jaro font family for distinct styling, while other elements use the game's standard text styling with stroke effects for contrast and visibility against any background. 