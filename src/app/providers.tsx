"use client";

import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <MantineProvider
            defaultColorScheme="light"
            theme={{
                fontFamily: "Inter, sans-serif",
                components: {
                    Input: {
                        styles: {
                            input: {
                                height: 58,
                                fontSize: 16,
                                padding: "12px 20px",
                                borderRadius: 8,
                                border: "1px solid #ccc",
                                "&:focus": {
                                    borderColor: "#000",
                                    color: "#000",
                                },
                            },
                        },
                    },
                    DateInput: {
                        styles: {
                            input: {
                                height: 58,
                                fontSize: 16,
                                padding: "12px 20px",
                                borderRadius: 8,
                                border: "1px solid #ccc",
                                "&:focus": {
                                    borderColor: "#000",
                                    color: "#000",
                                },
                            },
                        },
                    },
                    Calendar: {
                        styles: {
                            calendarHeaderLevel: {
                                fontSize: 16,
                                fontWeight: 600,
                            },
                            day: {
                                fontSize: 14,
                                width: 36,
                                height: 36,
                                margin: 2,
                                borderRadius: "50%",
                                "&[data-selected]": {
                                    backgroundColor: "#000",
                                    color: "#fff",
                                },
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            },
                        },
                    },
                },
            }}
        >
            <DatesProvider settings={{ locale: "en", firstDayOfWeek: 0 }}>
                {children}
            </DatesProvider>
        </MantineProvider>
    );
}
