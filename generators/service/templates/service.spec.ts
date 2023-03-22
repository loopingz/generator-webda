import { WebdaTest } from "@webda/core/lib/test";
import { suite, test } from "@testdeck/mocha";
import * as assert from "assert";
import { <%= name %> } from "./<%= filename %>";

@suite
class <%= name %>Test extends WebdaTest {
    service: <%= name %>;

    async before() {
        await super.before();
        this.service = this.registerService(new <%= name %>(this.webda, <%= name %>));
        await this.service.init();
    }

    @test
    async empty() {
        assert.ok(false, "Need to implement some tests");
    }
}