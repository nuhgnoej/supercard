import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/Navigation.tsx", [
    index("routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("new", "./routes/new.tsx"),
    route("cards", "./routes/cards.tsx"),
    route("today", "./routes/today.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("login", "./routes/login.tsx"),
    route("signup", "./routes/signup.tsx"),
    route("card/:cardId", "./routes/cardId.tsx"),
    route("edit/:cardId", "./routes/edit.tsx"),
    route("api/card/:cardId", "./routes/api/card.tsx"),
  ]),
] satisfies RouteConfig;
