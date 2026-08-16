# Phase 2: Quick Start Implementation Guide

## ✅ What to Do Right Now

### 1. Add Newman Dependencies (5 minutes)
```bash
cd qa-automation-assessment
npm install --save-dev newman newman-reporter-html
```

### 2. Create Postman Folder
```bash
mkdir -p postman
```

### 3. Copy Files to Your Repository

You have 3 files to add:

**File 1:** `postman/RestfulAPI.postman_collection.json`
- Contains all 6 API test cases
- Copy the collection I created above

**File 2:** `postman/RestfulAPI.postman_environment.json`
- Contains variables (base_url, object_id, etc.)
- Copy the environment file I created

**File 3:** `NOTES.md`
- Technical documentation
- Copy the notes file I created

### 4. Update package.json

Add these scripts:
```json
{
  "scripts": {
    "newman": "newman run postman/RestfulAPI.postman_collection.json -e postman/RestfulAPI.postman_environment.json --reporters cli,html --reporter-html-export ./results/newman-report.html",
    "newman:debug": "newman run postman/RestfulAPI.postman_collection.json -e postman/RestfulAPI.postman_environment.json --reporters cli",
    "test:all": "npm test && npm run newman"
  }
}
```

### 5. Create Results Directory
```bash
mkdir -p results
```

### 6. Test It!
```bash
# Run API tests
npm run newman

# Run everything (UI + API)
npm run test:all
```

---

## 📋 Deliverables Checklist

Before you submit, verify you have:

- [ ] `postman/RestfulAPI.postman_collection.json` - API collection with 6 tests
- [ ] `postman/RestfulAPI.postman_environment.json` - Environment variables
- [ ] `NOTES.md` - Technical documentation (critical!)
- [ ] `package.json` updated with Newman scripts
- [ ] `results/newman-report.html` - Generated report
- [ ] Updated `README.md` with API testing instructions
- [ ] `.gitignore` includes `results/` and `node_modules/`

---

## 🎯 What Gets Evaluated

### Code (40%)
- ✅ API collection design (proper structure)
- ✅ Test scripts quality (assertions)
- ✅ Variable management (reuse, no duplication)
- ✅ Pre-request scripts (unique data generation)

### Documentation (40%)
- ✅ NOTES.md answers all 5 questions thoroughly
- ✅ Design decisions well explained
- ✅ Test coverage justified
- ✅ Tools used with rationale
- ✅ Bug report with proper format
- ✅ Reliability investigation explained

### Structure & Cleanliness (20%)
- ✅ Clean commit history
- ✅ Organized folder structure
- ✅ Good README
- ✅ No hardcoded credentials
- ✅ Proper .gitignore

---

## 🚀 Expected Execution Flow

When you run `npm run newman`:

1. **POST Request** → Creates object with unique name
   - Pre-request script generates `TestProduct_TIMESTAMP`
   - Response returns `object_id`
   - Test script saves `object_id` to collection variable

2. **GET Request** → Retrieves created object
   - Uses `{{object_id}}` from collection variable
   - Verifies data integrity
   - All 5 tests pass

3. **PUT Request** → Updates price property
   - Uses saved `object_id`
   - Updates price to 2499
   - Verifies other properties unchanged

4. **DELETE Request** → Deletes object
   - Uses saved `object_id`
   - API returns success message
   - Object no longer exists

5. **GET (Deleted)** → Tries to retrieve deleted object
   - Uses saved `object_id`
   - API returns 404 Not Found
   - Confirms deletion

6. **NEGATIVE TEST** → Sends invalid payload
   - Missing "name" field
   - API returns 400 Bad Request
   - Proper error handling verified

**Total: 6 requests, 30+ assertions, 100% coverage**

---

## 💡 Pro Tips for Success

1. **Use Postman GUI First (Optional)**
   - Import collection into Postman desktop
   - Manually run through the flow once
   - Verify assertions work
   - Then export as JSON

2. **Test Locally**
   ```bash
   npm run newman:debug  # See live output
   npm run newman        # Generate HTML report
   ```

3. **Check Reports**
   - HTML report shows pass/fail for each request
   - Screenshots on failure (if enabled)
   - Detailed response body inspection

4. **Git Commits**
   ```bash
   git add postman/ NOTES.md package.json
   git commit -m "Add Phase 2: API testing with Postman/Newman"
   git push
   ```

5. **Time Management**
   - File setup: 10 minutes
   - Testing & debugging: 30 minutes
   - Documentation: 30 minutes
   - **Total: 1-1.5 hours** (well under 2-3 hour budget!)

---

## ❓ Common Issues & Fixes

### "newman: command not found"
```bash
npm install --save-dev newman
npm install --save-dev newman-reporter-html
```

### "Collection file not found"
```bash
# Verify file path
ls -la postman/RestfulAPI.postman_collection.json

# Check package.json command
# Should be: postman/RestfulAPI.postman_collection.json
```

### Tests fail due to network
```bash
# API might be temporarily down
# Retry or check https://api.restful-api.dev/ is accessible
curl https://api.restful-api.dev/objects
```

### Report not generated
```bash
# Verify results folder exists
mkdir -p results

# Check permissions
chmod 755 results/

# Run again
npm run newman
```

---

## 📞 Final Checklist Before Submission

- [ ] All 6 API tests implemented
- [ ] Each test has meaningful assertions (5+ per test)
- [ ] Variables properly reused (no hardcoded IDs)
- [ ] NOTES.md is complete (all 5 sections answered)
- [ ] Bug report included with proper format
- [ ] Reliability section explains your approach
- [ ] README updated with Newman instructions
- [ ] Tests pass locally and generate HTML reports
- [ ] Git history is clean (descriptive commits)
- [ ] No credentials in code or files
- [ ] Everything documented and explained

**You're ready for the walkthrough!** 🎉

---

## Notes for Walkthrough

Be prepared to explain:

1. **Why you chose this Postman structure**
   - Answer: Sequential flow with data persistence for realistic testing

2. **How variables work across requests**
   - Answer: Pre-request scripts set data, test scripts save to collection variables, next requests reuse them

3. **Why assertions are important**
   - Answer: Verify not just status codes but data integrity, business logic, and edge cases

4. **How you'd scale this for production**
   - Answer: Add more negative tests, support multiple environments, integrate with CI/CD, add performance monitoring

5. **How you'd make tests reliable**
   - Answer: Unique test data per run, proper timeouts, error retry logic, detailed logging

You've got this! 💪