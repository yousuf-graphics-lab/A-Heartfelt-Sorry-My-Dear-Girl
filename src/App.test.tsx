import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';
import { FLOWERS } from './data/flowers';

const hasText = (container: HTMLElement, snippet: string) => {
  expect(container.textContent ?? '').toContain(snippet);
};

describe('A Little Sorry, My Pakhi — the full journey', () => {
  it('walks from the opening all the way to the finale and back', async () => {
    const { container } = render(<App />);

    // ———— SCENE 1 — THE OPENING ————
    // the painting is there from the first frame
    expect(screen.getByAltText(/wax-sealed love letter/i)).toBeInTheDocument();
    const tellMe = await screen.findByRole('button', { name: /something i want to tell you/i }, { timeout: 6000 });
    hasText(container, "Hey, My Dear Sweetheart");
    hasText(container, "I know you're upset with me. But there's something I really want you to know.");
    fireEvent.click(tellMe);

    // ———— SCENE 2 — THE LETTER ————
    await screen.findByRole('heading', { name: /a letter from my heart/i }, { timeout: 4000 });
    hasText(container, 'For My Dear Sweetheart Pakhi');

    // sealed envelope — nothing from the letter is visible yet
    expect(container.textContent).not.toContain('distance create hok');
    fireEvent.click(screen.getByRole('button', { name: /open the envelope/i }));

    // the full letter, exactly as written
    await screen.findByText(/Amar Dear Sweetheart Pakhi,/i, undefined, { timeout: 4000 });
    hasText(container, 'Shotti bolte ami chai na amader moddhe evabe distance create hok');
    hasText(container, 'I am really sorry, Samiya, tomake koshto dewar jonno');
    hasText(container, 'Please nijer kheyal rakhio, shomoy moto kheye nio');
    hasText(container, 'tomar oi mishti hashi ta abar fire ashuk jeta amar jonno molin hoye gese');
    hasText(container, 'Tomar Yousuf');
    hasText(container, "There's Still Something More For You...");

    fireEvent.click(screen.getByRole('button', { name: /open my little garden/i }));

    // ———— SCENE 3 — THE GARDEN ————
    await screen.findByRole('heading', { name: /a bouquet of feelings/i }, { timeout: 4000 });
    hasText(container, "Every flower in this bouquet holds something I wish I could tell you.");
    hasText(container, "Tap each flower to discover what's hidden inside.");
    hasText(container, 'Flowers discovered: 0/8');

    // open each of the eight flowers, read its note, close it
    for (const flower of FLOWERS) {
      const button = screen.getByRole('button', { name: new RegExp(flower.name, 'i') });
      fireEvent.click(button);
      const dialog = await screen.findByRole('dialog');
      expect(within(dialog).getByText(flower.name)).toBeInTheDocument();
      fireEvent.keyDown(window, { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    }
    expect(screen.getByLabelText('Flowers discovered: 8 of 8')).toBeInTheDocument();

    // all eight bloomed — the path forward appears
    const continueBtn = await screen.findByRole('button', { name: /continue the story/i });
    fireEvent.click(continueBtn);

    // ———— SCENE 4 — ONE LAST MESSAGE ————
    await screen.findByRole('heading', { name: /one last thing, my pakhi/i }, { timeout: 4000 });
    hasText(container, 'Jano pakhi, ami chai na shudhu ajker jonno tomake sorry boli');
    hasText(container, 'Tomar oviman ke ami respect kori');
    hasText(container, 'I love you, my dear sweetheart pakhi.');

    fireEvent.click(screen.getByRole('button', { name: /one last surprise/i }));

    // ———— SCENE 5 — THE FINALE ————
    await screen.findByText(/to my beautiful/i, undefined, { timeout: 4000 });
    hasText(container, "I can't undo my mistakes, but I can learn from them");
    hasText(container, 'Thank you for being someone so special in my life.');
    hasText(container, 'Sorry, My Dear Sweetheart Pakhi.');
    hasText(container, 'Forever With Love,');
    hasText(container, 'Your Yousuf');

    // no forgiveness pressure anywhere
    expect(container.textContent?.toLowerCase()).not.toContain('please forgive');
    expect(container.textContent?.toLowerCase()).not.toContain('you must forgive');

    // ———— BACK TO THE LETTER — direct reading, music untouched ————
    fireEvent.click(screen.getByRole('button', { name: /read my letter again/i }));
    await screen.findByText(/Amar Dear Sweetheart Pakhi,/i, undefined, { timeout: 4000 });

    // ———— music controls exist and are honest ————
    expect(screen.getByRole('button', { name: /mute the music|unmute the music/i })).toBeInTheDocument();
  }, 30000);

  it('shows the discovered counter live as flowers are opened', async () => {
    const { container } = render(<App />);
    fireEvent.click(await screen.findByRole('button', { name: /something i want to tell you/i }, { timeout: 6000 }));
    fireEvent.click(await screen.findByRole('button', { name: /open the envelope/i }));
    fireEvent.click(await screen.findByRole('button', { name: /open my little garden/i }, { timeout: 5000 }));

    await screen.findByRole('heading', { name: /a bouquet of/i }, { timeout: 4000 });
    const first = FLOWERS[0];
    fireEvent.click(screen.getByRole('button', { name: new RegExp(first.name, 'i') }));
    await screen.findByRole('dialog');
    expect(screen.getByLabelText('Flowers discovered: 1 of 8')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(container.textContent).toContain('Flowers discovered: 1/8');
  }, 30000);
});
