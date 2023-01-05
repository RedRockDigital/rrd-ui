import React from "react";
import { render, screen } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import { Card, CardHeader, CardBody, CardFooter } from "./index";

describe("Card Renders Successfully", () => {
    it("renders headline", () => {
        render(
            <Card>
                <CardHeader>This text appears in the header</CardHeader>
                <CardBody>This text appears in the body</CardBody>
                <CardFooter>This text appears in the footer</CardFooter>
            </Card>
        );

        expect(screen.getByText("This text appears in the header")).toBeInTheDocument();
        expect(screen.getByText("This text appears in the body")).toBeInTheDocument();
        expect(screen.getByText("This text appears in the footer")).toBeInTheDocument();
    });
});
