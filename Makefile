.PHONY: dev

dev:
	cd frontend && npm install && npm run build && cd .. && ./gradlew bootRun
