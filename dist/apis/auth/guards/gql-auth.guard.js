"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const GqlAuthGuard = (name) => {
    return class GqlAuthGuard extends (0, passport_1.AuthGuard)(name) {
        getRequest(context) {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            return gqlContext.getContext().req;
        }
    };
};
exports.GqlAuthGuard = GqlAuthGuard;
//# sourceMappingURL=gql-auth.guard.js.map