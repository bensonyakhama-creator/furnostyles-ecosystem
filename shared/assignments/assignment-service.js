/**
 * Furnostyles Assignment Service
 * Core collection reader & writer managing mutations on 'assignments' and updates to matching 'serviceRequests'.
 */

(function () {
  'use strict';

  function _status() { return window.FurnostylesAssignmentStatus; }

  /**
   * Creates a formal assignment document in Firestore, transitioning request state to 'assigned'.
   */
  function createAssignment(requestId, providerId, role, priority, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));
    
    var s = _status() ? _status().STATUSES : {};
    var doc = {
      requestId: requestId,
      assignedTo: providerId,
      assignedRole: role || 'provider',
      assignmentStatus: s.ASSIGNED || 'assigned',
      assignmentPriority: priority || 'standard',
      assignedAt: new Date().toISOString(),
      completedAt: null,
      escalationStatus: 'none',
      updatedAt: new Date().toISOString()
    };

    return bridge.create('assignments', doc)
      .then(function (newDoc) {
        // Cascade state update onto parent serviceRequest
        return bridge.update('serviceRequests', requestId, {
          status: s.ASSIGNED || 'assigned',
          updatedAt: new Date().toISOString()
        }).then(function () {
          return newDoc;
        });
      });
  }

  /**
   * Modifies an active assignment status (e.g. accepted, declined, completed).
   */
  function updateAssignmentStatus(assignmentId, requestId, status, bridge) {
    if (!bridge) return Promise.reject(new Error('Firebase bridge unavailable.'));

    var updateData = {
      assignmentStatus: status,
      updatedAt: new Date().toISOString()
    };

    if (status === 'completed') {
      updateData.completedAt = new Date().toISOString();
    }

    return bridge.update('assignments', assignmentId, updateData)
      .then(function () {
        return bridge.update('serviceRequests', requestId, {
          status: status,
          updatedAt: new Date().toISOString()
        });
      });
  }

  window.FurnostylesAssignmentService = {
    createAssignment: createAssignment,
    updateAssignmentStatus: updateAssignmentStatus
  };

}());
