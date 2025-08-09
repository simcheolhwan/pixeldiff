# PixelDiff

Image comparison tool with multiple view modes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)

## Features

- **Multiple Comparison Modes**
  - Side-by-Side: View images next to each other
  - Overlay: Adjustable opacity
  - Swipe: Interactive slider

- **Interface**
  - Drag & drop image upload
  - Dark/Light theme
  - Persistent preferences
  - Internationalization (English/Korean)

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/simcheolhwan/pixeldiff.git
cd pixeldiff

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
# Type checking
pnpm typecheck

# Linting with auto-fix
pnpm lint

# Production build
pnpm build
```

## Usage

1. **Upload Images**: Drag and drop two images onto the upload area or click to browse
2. **Choose View Mode**: Select between Side-by-Side, Overlay, or Swipe view
3. **Compare**: Use the controls specific to each mode:
   - **Overlay**: Adjust opacity slider to blend images
   - **Swipe**: Drag the slider to reveal differences
4. **Customize**: Toggle dark/light theme and change language as needed

## Project Structure

```
pixeldiff/
├── src/
│   ├── viewer/            # Image viewer components
│   │   ├── ImageViewer.tsx       # Main viewer component
│   │   ├── SideBySideView.tsx    # Side-by-side comparison
│   │   ├── OverlayView.tsx       # Overlay comparison
│   │   ├── SwipeView.tsx         # Swipe comparison
│   │   └── ImageWithFallback.tsx # Image with error handling
│   ├── layout/            # Layout and UI components
│   │   ├── AppHeader.tsx         # Application header
│   │   ├── ImageDropzone.tsx     # Drag & drop upload area
│   │   ├── ImageControls.tsx     # View mode controls
│   │   ├── ImageWrapper.tsx      # Image container layout
│   │   ├── LanguageDropdown.tsx  # Language selector
│   │   └── ThemeSwitch.tsx       # Theme toggle
│   ├── hooks/             # Custom React hooks
│   │   ├── useImages.ts          # Image state management
│   │   ├── usePasteImage.ts      # Clipboard paste handler
│   │   ├── useSwipe.ts           # Swipe interaction logic
│   │   ├── useImageDimensions.ts # Image layout calculations
│   │   └── useTranslation.ts     # i18n hook
│   ├── store/             # State management
│   │   ├── atoms.ts              # Jotai atoms
│   │   └── translations.ts       # i18n strings
│   ├── styles/            # Global styles
│   ├── types.ts           # TypeScript definitions
│   └── App.tsx            # Main application
└── package.json           # Project configuration
```

## Configuration

User preferences are persisted in localStorage:

- Theme (Light/Dark)
- Language (English/Korean)
- View Mode

## Development

### Key Technologies

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Jotai](https://jotai.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Base UI Components](https://base-ui.com/)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Lint and auto-fix code

### Pre-commit Hooks

The project uses `simple-git-hooks` with `lint-staged` to ensure code quality:

- Automatically formats staged files with Prettier
- Runs before each commit

## License

This project is licensed under the MIT License
