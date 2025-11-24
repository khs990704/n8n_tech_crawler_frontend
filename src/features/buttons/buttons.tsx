import React from 'react'
import List from 'src/shared/layout/list/List.tsx'
import ListContent from 'src/shared/layout/list/ListContent.tsx'
import Button from 'src/features/buttons/components/button.tsx'

const Buttons = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <List>
                <ListContent title="Primary Buttons">
                    <Button text="Button text" textSize="xs" />
                    <Button text="Button text" textSize="sm" />
                    <Button
                        rounded="md"
                        px={2.5}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        rounded="md"
                        px={3}
                        py={2}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        rounded="md"
                        px={3.5}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                </ListContent>
                <ListContent title="Secondary Buttons">
                    <Button type="secondary" text="Button text" textSize="xs" />
                    <Button type="secondary" text="Button text" textSize="sm" />
                    <Button
                        type="secondary"
                        rounded="md"
                        px={2.5}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="secondary"
                        rounded="md"
                        px={3}
                        py={2}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="secondary"
                        rounded="md"
                        px={3.5}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                </ListContent>
                <ListContent title="Soft Buttons">
                    <Button type="soft" text="Button text" textSize="xs" />
                    <Button type="soft" text="Button text" textSize="sm" />
                    <Button
                        type="soft"
                        rounded="md"
                        px={2.5}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="soft"
                        rounded="md"
                        px={3}
                        py={2}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="soft"
                        rounded="md"
                        px={3.5}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                </ListContent>
                <ListContent title="Buttons With Leading Icon">
                    <Button
                        rounded="md"
                        px={2.5}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                        icon="left"
                    />
                    <Button
                        rounded="md"
                        px={3}
                        py={2}
                        text="Button text"
                        textSize="sm"
                        icon="left"
                    />
                    <Button
                        rounded="md"
                        px={3.5}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                        icon="left"
                    />
                </ListContent>
                <ListContent title="Buttons With Trailing Icon">
                    <Button
                        rounded="md"
                        px={2.5}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                        icon="right"
                    />
                    <Button
                        rounded="md"
                        px={3}
                        py={2}
                        text="Button text"
                        textSize="sm"
                        icon="right"
                    />
                    <Button
                        rounded="md"
                        px={3.5}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                        icon="right"
                    />
                </ListContent>
                <ListContent title="Rounded Primary Buttons">
                    <Button
                        rounded="full"
                        px={2.5}
                        text="Button text"
                        textSize="xs"
                    />
                    <Button
                        rounded="full"
                        px={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        rounded="full"
                        px={3}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        rounded="full"
                        px={3.5}
                        py={2}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        rounded="full"
                        px={4}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                </ListContent>
                <ListContent title="Rounded Secondary Buttons">
                    <Button
                        type="secondary"
                        rounded="full"
                        px={2.5}
                        text="Button text"
                        textSize="xs"
                    />
                    <Button
                        type="secondary"
                        rounded="full"
                        px={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="secondary"
                        rounded="full"
                        px={3}
                        py={1.5}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="secondary"
                        rounded="full"
                        px={3.5}
                        py={2}
                        text="Button text"
                        textSize="sm"
                    />
                    <Button
                        type="secondary"
                        rounded="full"
                        px={4}
                        py={2.5}
                        text="Button text"
                        textSize="sm"
                    />
                </ListContent>
                <ListContent title="Circular Buttons">
                    <Button
                        type="circular"
                        p={1}
                    />
                    <Button
                        type="circular"
                        p={1.5}
                    />
                    <Button
                        type="circular"
                        p={2}
                    />
                </ListContent>
            </List>
        </div>
    )
}

export default Buttons
