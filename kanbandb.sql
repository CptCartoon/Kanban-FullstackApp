USE kanbandb;

CREATE TABLE board (
board_id int NOT NULL AUTO_INCREMENT,
board_name VARCHAR(100) NOT NULL,
PRIMARY KEY(board_id)
);

CREATE TABLE boardColumn (
column_id int NOT NULL AUTO_INCREMENT,
board_id int NOT NULL,
column_name VARCHAR(100) NOT NULL,
PRIMARY KEY(column_id),
FOREIGN KEY (board_id) REFERENCES board(board_id)
ON DELETE CASCADE
);

CREATE TABLE task (
task_id int NOT NULL AUTO_INCREMENT,
column_id int NOT NULL,
board_id int NOT NULL,
task_title VARCHAR(100) NOT NULL,
task_description VARCHAR(2000),
PRIMARY KEY(task_id),
FOREIGN KEY (column_id) REFERENCES boardColumn(column_id)
ON DELETE CASCADE
);

CREATE TABLE subtask (
subtask_id int NOT NULL AUTO_INCREMENT,
task_id int NOT NULL,
board_id int NOT NULL,
subtask_title VARCHAR(100) NOT NULL,
subtask_iscomplete VARCHAR(5) NOT NULL,
PRIMARY KEY(subtask_id),
FOREIGN KEY (task_id) REFERENCES task(task_id)
ON DELETE CASCADE
);

/* BOARDS INSERT */
INSERT INTO board(board_id, board_name) VALUES(1, 'Platform Launch');
INSERT INTO board(board_id, board_name) VALUES(2, 'Marketing Plan');
INSERT INTO board(board_id, board_name) VALUES(3, 'Roadmap');

/* COLUMNS INSERT */
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(1, 1, 'Todo');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(2, 1, 'Doing');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(3, 1, 'Done');

INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(4, 2, 'Todo');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(5, 2, 'Doing');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(6, 2, 'Done');

INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(7, 3, 'Now');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(8, 3, 'Next');
INSERT INTO boardColumn(column_id, board_id, column_name) VALUES(9, 3, 'Later');


/* TASKS INSERT */
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(1, 1, 1,'Build UI for onboarding flow', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(2, 1, 1,'Build UI for search', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(3, 1, 1,'Build settings UI', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(4, 1, 1,'QA and test all major user journeys', 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.');

INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(5, 2, 1,'Design settings and search pages', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(6, 2, 1,'Add account management endpoints', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(7, 2, 1,'Design onboarding flow', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(8, 2, 1,'Add search enpoints', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(9, 2, 1,'Add authentication endpoints', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(10, 2, 1,'Research pricing points of various competitors and trial different business models', "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.");

INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(11, 3, 1,'Conduct 5 wireframe tests', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(12, 3, 1,'Create wireframe prototype', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(13, 3, 1,'Review results of usability tests and iterate', "Keep iterating through the subtasks until we're clear on the core concepts for the app.");
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(14, 3, 1,'Create paper prototypes and conduct 10 usability tests with potential customers', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(15, 3, 1,'Market discovery', 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(16, 3, 1,'Competitor analysis', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(17, 3, 1,'Research the market', 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.');

INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(18, 4, 2,'Plan Product Hunt launch', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(19, 4, 2,'Share on Show HN', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(20, 4, 2,'Write launch article to publish on multiple channels', '');

INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(21, 7, 3,'Launch version one', '');
INSERT INTO task(task_id, column_id, board_id, task_title, task_description ) VALUES(22, 7, 3,'Review early feedback and plan next steps for roadmap', "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.");


/* SUBTASKS INSERT */
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(1, 1, 1,'Sign up page', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(2, 1, 1,'Sign in page', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(3, 1, 1,'Welcome page', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(4, 2, 1,'Search page', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(5, 3, 1,'"Account page', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(6, 3, 1,'Billing page', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(7, 4, 1,'Internal testing', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(8, 4, 1,'External testing', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(9, 5, 1,'Settings - Account page', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(10, 5, 1,'Settings - Billing page', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(11, 5, 1,'Search page', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(12, 6, 1,'Upgrade plan', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(13, 6, 1,'Cancel plan', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(14, 6, 1,'Update payment method', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(15, 7, 1,'Sign up page', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(16, 7, 1,'Sign in page', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(17, 7, 1,'Welcome page', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(18, 8, 1,'Add search endpoint', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(19, 8, 1,'Define search filters', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(20, 9, 1,'Define user model', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(21, 9, 1,'Add auth endpoints', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(22, 10, 1,'Research competitor pricing and business models', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(23, 10, 1,'Outline a business model that works for our solution', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(24, 10, 1,'Talk to potential customers about our proposed solution and ask for fair price expectancy', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(25, 11, 1,'Complete 5 wireframe prototype tests', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(26, 12, 1,'Create clickable wireframe prototype in Balsamiq', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(27, 13, 1,'Meet to review notes from previous tests and plan changes', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(28, 13, 1,'Make changes to paper prototypes', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(29, 13, 1,'Conduct 5 usability tests', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(30, 14, 1,'Create paper prototypes for version one', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(31, 14, 1,'Complete 10 usability tests', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(32, 15, 1,'Interview 10 prospective customers', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(33, 16, 1,'Find direct and indirect competitors', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(34, 16, 1,'SWOT analysis for each competitor', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(35, 17, 1,'Write up research analysis', 'true');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(36, 17, 1,'Calculate TAM', 'true');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(37, 18, 2,'Find hunter', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(38, 18, 2,'Gather assets', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(39, 18, 2,'Draft product page', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(40, 18, 2,'Notify customers', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(41, 18, 2,'Notify network', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(42, 18, 2,'Launch!', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(43, 19, 2,'Draft out HN post', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(44, 19, 2,'Get feedback and refine', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(45, 19, 2,'Publish post', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(46, 20, 2,'Write article', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(47, 20, 2,'Publish on LinkedIn', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(48, 20, 2,'Publish on Inndie Hackers', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(49, 20, 2,'Publish on Medium', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(50, 21, 3,'Launch privately to our waitlist', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(51, 21, 3,'Launch publicly on PH, HN, etc.', 'false');

INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(52, 22, 3,'Interview 10 customers', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(53, 22, 3,'Review common customer pain points and suggestions', 'false');
INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(54, 22, 3,'Outline next steps for our roadmap', 'false');