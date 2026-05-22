import { test, expect, Page } from '@playwright/test';

/**
 * Helper: Add a new todo item by typing into the main input and pressing Enter.
 */
async function addTodo(page: Page, text: string): Promise<void> {
  await page.getByPlaceholder('What needs to be done?').fill(text);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
}

test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
  });

  test('Adds a single todo and verifies it appears in the list', async ({ page }) => {
    await addTodo(page, 'Learn Playwright');

    const todoItem = page.getByTestId('todo-item');
    await expect(todoItem).toHaveCount(1);
    await expect(todoItem.first()).toContainText('Learn Playwright');
  });

  test('Adds another todo "Write tests" and verifies both appear in the list', async ({ page }) => {
    await addTodo(page, 'Learn Playwright');
    await addTodo(page, 'Write tests');

    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems.nth(0)).toContainText('Learn Playwright');
    await expect(todoItems.nth(1)).toContainText('Write tests');
  });

  test('Marks a todo "Learn Playwright" as completed and verifies filters work correctly', async ({ page }) => {
    // Arrange: add two todos
    await addTodo(page, 'Learn Playwright');
    await addTodo(page, 'Write tests');

    // Act: mark "Learn Playwright" as completed via its checkbox
    const learnPlaywrightItem = page.getByTestId('todo-item').filter({ hasText: 'Learn Playwright' });
    await learnPlaywrightItem.getByRole('checkbox').check();

    // Assert: the item now carries the "completed" class
    await expect(learnPlaywrightItem).toHaveClass(/completed/);

    // Assert: "Completed" filter shows exactly 1 item
    await page.getByRole('link', { name: 'Completed' }).click();
    const completedItems = page.getByTestId('todo-item');
    await expect(completedItems).toHaveCount(1);
    await expect(completedItems.first()).toContainText('Learn Playwright');

    // Assert: "Active" filter shows only "Write tests"
    await page.getByRole('link', { name: 'Active' }).click();
    const activeItems = page.getByTestId('todo-item');
    await expect(activeItems).toHaveCount(1);
    await expect(activeItems.first()).toContainText('Write tests');
  });

  test('Clears completed items and verifies the list updates', async ({ page }) => {
    // Arrange
    await addTodo(page, 'Learn Playwright');
    await addTodo(page, 'Write tests');

    // Complete "Learn Playwright"
    const learnPlaywrightItem = page.getByTestId('todo-item').filter({ hasText: 'Learn Playwright' });
    await learnPlaywrightItem.getByRole('checkbox').check();

    // Act: click "Clear completed"
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Assert: only the active item remains
    const remainingItems = page.getByTestId('todo-item');
    await expect(remainingItems).toHaveCount(1);
    await expect(remainingItems.first()).toContainText('Write tests');

    // Assert: the "Clear completed" button is gone
    await expect(page.getByRole('button', { name: 'Clear completed' })).not.toBeVisible();
  });
});
